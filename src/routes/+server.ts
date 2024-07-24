import { addMood } from "$lib/server/mood";
import type { RequestHandler } from "./$types";

type RequestMoodData = {
    mood: number;
    note?: string;
};

export const POST: RequestHandler = async ({ request }) => {
    const body: RequestMoodData = await request.json();
    const mood = await addMood({
        mood: body.mood,
        note: body.note,
    });
    return new Response(JSON.stringify(mood));
};