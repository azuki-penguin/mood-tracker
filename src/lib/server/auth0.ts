import { env } from "$env/dynamic/private";

export class Auth0ApiError extends Error {
    readonly response: { status: number, body: unknown };
    constructor(message: string, response:  { status: number, body: unknown }) {
        super(message);
        this.response = response;
    }
}

type PasswordlessStartRequestBody = {
    client_id: string;
    client_secret: string;
    connection: 'email';
    email: string;
    send?: 'link'|'code';
    authParams?: {
        scope?: string;
        state?: string;
        response_type?: string;
        redirect_uri?: string;
    };
};
type PasswordlessStartResponseBody = {
    _id: string;
    email: string;
    email_verified: boolean;
};

export const sendPasswordlessLink = async (email: string, state: string, redirectUri: string) => {
    const url = `https://${env.AUTH0_DOMAIN}/passwordless/start`;
    const reqBody: PasswordlessStartRequestBody = {
        email,
        client_id: env.AUTH0_CLIENT_ID,
        client_secret: env.AUTH0_CLIENT_SECRET,
        connection: 'email',
        send: 'link',
        authParams: {
            state,
            scope: 'openid profile email',
            response_type: 'code',
            redirect_uri: redirectUri,
        },
    };
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(reqBody),
    });

    const json = await response.json();
    if (response.ok) {
        return json as PasswordlessStartResponseBody;
    } else {
        throw new Auth0ApiError('Failed to send passwordless link.', {
            status: response.status,
            body: json,
        });
    }
};

type Auth0TokenResponseBody = {
    access_token: string;
    id_token: string;
    scope: string;
    expires_in: number;
    token_type: string;
};

export const getToken = async (code: string, redirectUri: string) => {
    const params = new URLSearchParams();
    params.set('grant_type', 'authorization_code');
    params.set('client_id', env.AUTH0_CLIENT_ID);
    params.set('client_secret', env.AUTH0_CLIENT_SECRET);
    params.set('code', code);
    params.set('redirect_uri', redirectUri);
    const url = `https://${env.AUTH0_DOMAIN}/oauth/token`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
        body: params,
    });

    const json = await response.json();
    if (response.ok) {
        return json as Auth0TokenResponseBody;
    } else {
        console.error(json);
        throw new Error('Auth0 API error');
    }
};

type Auth0ProfileResponseBody = {
    sub: string;
    nickname: string;
    name: string;
    picture: string;
    updated_at: string;
    email: string;
    email_verified: boolean;
};

export const getProfile = async (token: Auth0TokenResponseBody) => {
    const url = `https://${env.AUTH0_DOMAIN}/userinfo`;
    const response = await fetch(url, {
        headers: {
            authorization: `Bearer ${token.access_token}`,
        },
    });

    const json = await response.json();
    if (response.ok) {
        return json as Auth0ProfileResponseBody;
    } else {
        console.error(json);
        throw new Error('Auth0 API error');
    }
};
