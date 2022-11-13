export const load = async (event) => {
    return {
        boardId: (await event.params).id
    }
}