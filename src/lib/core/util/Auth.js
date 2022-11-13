import {SupabaseClient} from '$lib/core/util/SupabaseClient'

/**
 * Returns the user from Supabase db matching the given userId
 *
 * @param userId
 * @param supabaseClient
 * @returns {Promise<*>}
 */
export const getUserProfile = async (userId, supabaseClient = SupabaseClient) => {
    const {data, error, status} = await supabaseClient
        .from('core_user')
        .select(`username, avatar_url, global_settings`)
        .eq('id', userId)
        .single();
    if (error && status !== 406) throw error;
    return data;
}

/**
 * Updates the user profile with the provided data
 *
 * @param userData
 * @returns {Promise<void>}
 */
export const updateUserProfile = async (userData) => {
    let {error} = await SupabaseClient.from('core_user').upsert(userData)
    if (error) throw error
}

/**
 * Sign out the current user
 *
 * @returns {Promise<void>}
 */
export const signOutUser = async () => {
    let {error} = await SupabaseClient.auth.signOut()
    if (error) throw error
}

