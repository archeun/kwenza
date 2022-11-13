import {getServerSession, getSupabase} from "@supabase/auth-helpers-sveltekit";
import {getUserProfile} from "$lib/core/util/Auth";

export async function load(event) {
    const session = await getServerSession(event);
    const {supabaseClient} = await getSupabase(event);
    let globalSettings;
    if (session.user) {
        const profile = await getUserProfile(session.user.id, supabaseClient);
        globalSettings = profile.global_settings;
    }
    return {
        session: await getServerSession(event),
        globalSettings: globalSettings
    }
}