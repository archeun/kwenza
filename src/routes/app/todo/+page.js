import FaNetworkWired from 'svelte-icons/fa/FaNetworkWired.svelte'

export const load = async (event) => {
    return {
        InnerLeftMenuItems: [
            {
                heading: 'Boards',
                headingIcon: FaNetworkWired,
                menuItems: [
                    {
                        name: 'Work',
                        route: '/app/todo/work',
                        icon: ''
                    }
                ]
            }
        ]
    }
}