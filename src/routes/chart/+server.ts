import { fetchMoodList } from "$lib/server/mood";
import { parse } from "@formkit/tempo";
import { error } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url, locals }) => {
    if (!locals.currentUser) {
        throw error(401, { message: 'Unauthenticated.' });
    }
    const reqDate = url.searchParams.get('date');
    if (!reqDate) {
        error(400, { message: 'parameter `date` is required.' });
    }

    let date: Date;
    try {
        date = parse(reqDate);
    } catch {
        error(400, { message: 'Invalid date format.' });
    }
    const moodList = await fetchMoodList({ date, userId: locals.currentUser.userId });
    return new Response(JSON.stringify(moodList));
};