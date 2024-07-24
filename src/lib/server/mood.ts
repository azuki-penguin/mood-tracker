import { database } from '$lib/server/mongodb';

type MoodData = {
    mood: number;
    note?: string;
};

export const fetchMoodList = async () => {
    const mood = await database.collection('mood-list').find();
    return await mood.map((x) => ({ mood: x.mood, date: x.date })).toArray();
};

export const addMood = async (moodData: MoodData) =>  {
    const { acknowledged, insertedId } = await database.collection('moodLogs')
        .insertOne({
            ...moodData,
            createdAt: new Date(),
        });
    if (acknowledged) {
        const mood = await database.collection('moodLogs').findOne(insertedId);
        return await mood;
    }
    return null;
};