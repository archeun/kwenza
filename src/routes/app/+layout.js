import {MainLeftMenu} from '$lib/util/Menu';

export const load = async (event) => {
    return {
        menu: {
            MainLeft: MainLeftMenu,
        }
    }
}