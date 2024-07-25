import { fetchMoodList } from "$lib/server/mood";
import { parse } from "@formkit/tempo";
import { error } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {
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
    const moodList = await fetchMoodList({ date });
    return new Response(JSON.stringify(moodList));
};