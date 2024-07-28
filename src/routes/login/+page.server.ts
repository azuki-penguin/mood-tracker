import { error, fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { Auth0ApiError, sendPasswordlessLink } from "$lib/server/auth0";

export const actions = {
    async default({ cookies, request, url }) {
        const data = await request.formData();
        const email = data.get('email') as string;

        if (!email) {
            return fail(400, { email, error: 'Email address required.' });
        }

        try {
            const state = crypto.randomUUID();
            const redirectUri = `${url.origin}/api/auth/callback`;
            await sendPasswordlessLink(email, state, redirectUri);

            cookies.set('state', state, { path: '/' });
            return { success: true };
        } catch (err: unknown) {
            if (err instanceof Auth0ApiError) {
                return fail(err.response.status, {
                    response: err.response,
                    error: err.message,
                });
            }
            return error(500);
        }
    },
} satisfies Actions;