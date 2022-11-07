import {getServerSession} from "@supabase/auth-helpers-sveltekit";

export async function load(event) {
    return {
        session: await getServerSession(event),
    }
}