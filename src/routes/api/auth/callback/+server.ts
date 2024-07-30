import { error, redirect, type RequestHandler } from "@sveltejs/kit";
import { getProfile, getToken } from "$lib/server/auth0";
import { createSession } from "$lib/server/session";

export const GET: RequestHandler = async ({ cookies, url }) => {
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const redirectUri = `${url.origin}/api/auth/callback`;

    if (!(code && state)) {
        throw error(400, { message: 'invalid request' });
    }

    const savedState = cookies.get('state');
    cookies.delete('state', { path: '/' });
    if (state !== savedState) {
        throw error(400, { message: 'state mismatch' });
    }

    const token = await getToken(code, redirectUri);
    const { sub, email } = await getProfile(token);
    const sessionId = await createSession({
        email,
        accessToken: token.access_token,
        idToken: token.id_token,
        scope: token.scope,
        expires_in: token.expires_in,
        tokenType: token.token_type,
        userId: sub,
    });
    cookies.set('mood-tracker-session', sessionId, { path: '/' });

    throw redirect(303, '/');
};