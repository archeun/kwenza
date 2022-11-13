import todoWs from "$lib/app/todo/WebService";
import {getSupabase} from '@supabase/auth-helpers-sveltekit';

export const load = async (event) => {
    const {supabaseClient} = await getSupabase(event);
    const boards = await todoWs(supabaseClient).Board.fetchAllForUser();
    const boardMenuItems = boards.map(board => {
        return {
            name: board.name,
            route: `/app/todo/board/${board.id}`,
            icon: board.icon,
        }
    });
    return {
        InnerLeftMenuItems: [
            {
                heading: 'Boards',
                headingIcon: 'FaNetworkWired',
                menuItems: boardMenuItems
            }
        ]
    };
}