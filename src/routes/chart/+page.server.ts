import { fetchMoodList } from '$lib/server/mood';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.currentUser) {
        throw error(401, { message: 'Unauthenticated.' });
    }
    const now = new Date();
    const list = await fetchMoodList({ date: now, userId: locals.currentUser.userId });
    return { list, date: now };
};