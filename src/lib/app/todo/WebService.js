const todoWs = (SupabaseClient) => {
    const Board = {
        fetchAllForUser: async function () {
            const {data, error, status} = await SupabaseClient
                .from('todo_board')
                .select(`id, name, icon`);
            if (error && status !== 406) throw error;
            return data;
        }
    };
    const Todo = {
        fetchAllForUserForBoard: async function (boardId) {
            const {data, error, status} = await SupabaseClient
                .from('todo_todo_item')
                .select(`id, name, is_completed, due_at`)
                .eq('board_id', boardId)
                .order('due_at');
            if (error && status !== 406) throw error;
            return data;
        }
    };

    return {Board, Todo}
}

export default todoWs;
