import { addMood } from "$lib/server/mood";
import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import type { Coordinates } from "$lib/models/Coordinates";
import type { Weather } from "$lib/models/Weather";
import { getCurrentWeather } from "$lib/server/weather";

type RequestMoodData = {
    mood: number;
    notes?: string;
    coord?: Coordinates;
};

export const POST: RequestHandler = async ({ request, locals }) => {
    const body: RequestMoodData = await request.json();
    if (!locals.currentUser) {
        throw error(401, { message: 'Unauthenticated.' });
    }

    let currentWeather: Weather|undefined;
    if (body.coord) {
        currentWeather = await getCurrentWeather(body.coord);
    }

    const mood = await addMood({
        mood: body.mood,
        notes: body.notes,
        userId: locals.currentUser.userId,
    }, currentWeather);
    return new Response(JSON.stringify(mood));
};