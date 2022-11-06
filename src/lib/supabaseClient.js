import {createClient} from '@supabase/auth-helpers-sveltekit'
import {env} from '$env/dynamic/public'

console.log(env)
export const supabaseClient = createClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ANON_KEY)