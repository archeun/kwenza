import {createClient} from '@supabase/auth-helpers-sveltekit'
import {SUPABASE_URL, SUPABASE_ANON_KEY} from '$lib/core/util/Env';

export const SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)