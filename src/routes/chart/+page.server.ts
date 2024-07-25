import { fetchMoodList } from '$lib/server/mood';

export const load = async () => {
    const now = new Date();
    const list = await fetchMoodList({ date: now });
    return { list };
};