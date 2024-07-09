import { fetchMoodList } from '$lib/server/mood';

export const load = async () => {
    const list = await fetchMoodList();
    return { list };
};