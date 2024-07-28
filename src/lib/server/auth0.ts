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
