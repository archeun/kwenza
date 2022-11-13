<script>
    import {SupabaseClient} from '$lib/core/util/SupabaseClient'
    import {page} from '$app/stores'
    import {invalidate} from '$app/navigation'
    import {onMount} from 'svelte'
    import logo from '$lib/assets/navbar-logo.png';
    import '../../app.css'
    import {signOutUser} from "$lib/core/util/Auth";
    import {Icons} from "$lib/core/util/Icons";

    const user = $page.data.session.user;

    onMount(() => {
        const {
            data: {subscription},
        } = SupabaseClient.auth.onAuthStateChange(() => {
            invalidate('supabase:auth')
        })

        return () => {
            subscription.unsubscribe()
        }
    })
</script>

<div class="flex min-h-screen h-max">
    <div class="flex-none">
        <ul class="menu bg-secondary text-white h-full w-full">
            {#each $page.data.menu.MainLeft.menuItems as menuItem}
                <li>
                    <a href="{menuItem.route}">
                        <span class="w-5 h-5">
                            <svelte:component this={Icons[menuItem.icon]}/>
                        </span>
                    </a>
                </li>
            {/each}
            <li>
                <div class="dropdown dropdown-right dropdown-content">
                    <label tabindex="0">
                        <div tabindex="0" class="avatar cursor-pointer">
                            <div class="w-6 rounded-full">
                                <img src="{user.user_metadata.avatar_url}" alt="{user.user_metadata.full_name}"/>
                            </div>
                        </div>
                    </label>
                    <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-white text-black rounded-sm w-52">
                        <li><a href="/app/settings">Settings</a></li>
                        <li>
                            <button on:click={async () => await signOutUser()}>Logout</button>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
    <div class="min-h-screen h-max w-screen">
        <div class="flex">
            {#if $page.data.InnerLeftMenuItems}
                <div class="flex-none w-56">
                    <ul class="menu text-sm border-r border-r w-56  min-h-screen h-max">
                        {#each $page.data.InnerLeftMenuItems as menuItem}
                            <li class="font-bold text-secondary">
                                <div>
                                    {#if menuItem.headingIcon}
                                        <span class="w-4 h-4">
                                            <svelte:component this={Icons[menuItem.headingIcon]}/>
                                        </span>
                                    {/if}
                                    {menuItem.heading}
                                </div>
                            </li>
                            {#each menuItem.menuItems as menuItem}
                                <li class="rounded-md ml-8">
                                    <a href="{menuItem.route}">
                                        {#if menuItem.icon}
                                        <span class="w-4 h-4">
                                            <svelte:component this={Icons[menuItem.icon]}/>
                                        </span>
                                        {/if}
                                        <span>{menuItem.name}</span>
                                    </a>
                                </li>
                            {/each}
                        {/each}
                    </ul>
                </div>
            {/if}
            <div class="flex-auto w-64 ml-3">
                <slot/>
            </div>
        </div>
    </div>
</div>

