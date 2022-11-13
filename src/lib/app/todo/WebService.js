import {SupabaseClient} from '$lib/core/util/SupabaseClient'

export const Board = {
    fetchAllForUser: async () => {
        const {data, error, status} = await SupabaseClient
            .from('todo_board')
            .select(`id, name, icon`);
        if (error && status !== 406) throw error;
        return data;
    }
}
