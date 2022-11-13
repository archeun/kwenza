import FaNetworkWired from 'svelte-icons/fa/FaNetworkWired.svelte'
import {Board} from "$lib/app/todo/WebService";
import {BoardIcons} from "$lib/app/todo/Util";

export const load = async ({parent}) => {
    const pageData = await parent();
    const boards = await Board.fetchAllForUser(pageData.session.user.id);
    const boardMenuItems = boards.map(board => {
        return {
            name: board.name,
            route: `/app/todo/board/${board.id}`,
            icon: BoardIcons[board.icon],
        }
    });
    return {
        InnerLeftMenuItems: [
            {
                heading: 'Boards',
                headingIcon: FaNetworkWired,
                menuItems: boardMenuItems
            }
        ]
    };
}