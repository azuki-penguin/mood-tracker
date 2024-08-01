import type { Weather } from '$lib/models/Weather';
import { database } from '$lib/server/mongodb';
import { addDay, dayEnd, dayStart } from '@formkit/tempo';

type MoodData = {
    mood: number;
    note?: string;
    userId: string;
};

type MoodRecord = MoodData & {
    createdAt: Date;
    id: string;
};

type SearchMoodInput = {
    date: Date;
    userId: string;
};

export const fetchMoodList = async (input: SearchMoodInput) => {
    const from = dayStart(input.date);
    const to = dayEnd(addDay(from, 7));
    const mood = await database.collection('moodLogs').find({
        userId: input.userId,
        createdAt: {
            $gte: from,
            $lte: to,
        },
    });
    return await mood.map<MoodRecord>((x) => ({
        mood: x.mood,
        note: x.note,
        userId: x.userId,
        createdAt: x.createdAt,
        id: x._id.toString(),
    })).toArray();
};

export const addMood = async (moodData: MoodData, weather?: Weather) =>  {
    const { acknowledged, insertedId } = await database.collection('moodLogs')
        .insertOne({
            ...moodData,
            ...weather,
            createdAt: new Date(),
        });
    if (acknowledged) {
        const mood = await database.collection('moodLogs').findOne(insertedId);
        return await mood;
    }
    return null;
};