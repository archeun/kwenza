export const load = async (event) => {
    return {
        InnerLeftMenuItems: [
            {
                heading: 'Profile',
                headingIcon: 'FaExpeditedssl',
                menuItems: [
                    {
                        name: 'Basic Information',
                        route: '/app',
                        icon: 'FaUserCog',
                    }
                ]
            }
        ]
    }
}