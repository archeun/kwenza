import {getSupabase} from '@supabase/auth-helpers-sveltekit'
import {redirect} from "@sveltejs/kit";
import {notifications} from '$lib/store/notifications';

export const load = async (event) => {
    const {session} = await getSupabase(event)
    if (!session && event.route.id !== '/') {
        throw redirect(302, '/');
    } else if (session && event.route.id === '/') {
        throw redirect(302, '/app');
    }
    if (typeof localStorage !== 'undefined' && event.data.globalSettings) {
        localStorage.setItem('global-settings', JSON.stringify(event.data.globalSettings))
    }
    return {session, notifications}
}