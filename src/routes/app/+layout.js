import {MainLeftMenu} from '$lib/core/util/Menu';

export const load = async (event) => {
    return {
        menu: {
            MainLeft: MainLeftMenu,
        }
    }
}