import { findSession } from "$lib/server/session";
import { type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    const sessionId = event.cookies.get('mood-tracker-session');
    if (sessionId) {
        event.locals.currentUser = await findSession(sessionId);
    }

    return await resolve(event);
};