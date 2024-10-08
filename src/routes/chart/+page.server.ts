import { fetchMoodList } from '$lib/server/mood';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.currentUser) {
        throw redirect(302, '/login');
    }
    const now = new Date();
    const list = await fetchMoodList({ date: now, userId: locals.currentUser.userId });
    return { list, date: now };
};