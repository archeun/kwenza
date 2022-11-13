import FaUserCog from 'svelte-icons/fa/FaUserCog.svelte';
import FaExpeditedssl from 'svelte-icons/fa/FaExpeditedssl.svelte'

export const load = async (event) => {
    return {
        InnerLeftMenuItems: [
            {
                heading: 'Profile',
                headingIcon: FaExpeditedssl,
                menuItems: [
                    {
                        name: 'Basic Information',
                        route: '/app',
                        icon: FaUserCog,
                    }
                ]
            }
        ]
    }
}