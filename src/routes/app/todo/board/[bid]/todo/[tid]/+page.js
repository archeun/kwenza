import todoWs from "$lib/app/todo/WebService";
import {SupabaseClient} from "$lib/core/util/SupabaseClient";

export const load = async (event) => {
    const todoId = (await event.params).tid;
    const todo = await todoWs(SupabaseClient).Todo.getById(todoId)
    return {todo}
}