const todoWs = (SupabaseClient) => {
    const Board = {
        fetchAllForUser: async function () {
            const {data, error, status} = await SupabaseClient
                .from('todo_board')
                .select(`id, name, icon`);
            if (error && status !== 406) throw error;
            return data;
        }
    }

    return {Board}
}

export default todoWs;
