import { database } from '$lib/server/mongodb';

export const fetchMoodList = async () => {
    const mood = await database.collection('mood-list').find();
    return await mood.map((x) => ({ mood: x.mood, date: x.date })).toArray();
};