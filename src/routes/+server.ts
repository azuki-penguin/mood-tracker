import { addMood } from "$lib/server/mood";
import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

type RequestMoodData = {
    mood: number;
    note?: string;
};

export const POST: RequestHandler = async ({ request, locals }) => {
    const body: RequestMoodData = await request.json();
    if (!locals.currentUser) {
        throw error(401, { message: 'Unauthenticated.' });
    }

    const mood = await addMood({
        mood: body.mood,
        note: body.note,
        userId: locals.currentUser.userId,
    });
    return new Response(JSON.stringify(mood));
};