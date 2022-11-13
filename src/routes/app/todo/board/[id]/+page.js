import todoWs from "$lib/app/todo/WebService";
import {SupabaseClient} from "$lib/core/util/SupabaseClient";

export const load = async (event) => {
    const boardId = (await event.params).id;
    const todosInBoard = await todoWs(SupabaseClient).Todo.fetchAllForUserForBoard(boardId)
    return {
        todos: todosInBoard,
    }
}