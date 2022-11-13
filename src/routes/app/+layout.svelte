<script>
    import {SupabaseClient} from '$lib/core/util/SupabaseClient'
    import {page} from '$app/stores'
    import {invalidate} from '$app/navigation'
    import {onMount} from 'svelte'
    import logo from '$lib/assets/navbar-logo.png';
    import '../../app.css'
    import {signOutUser} from "$lib/core/util/Auth";

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
<div class="navbar bg-white drop-shadow-md z-50 relative">
    <div class="flex-1">
        <img class="bg-white rounded-md p-1.5" alt="Kwenza logo" src={logo}/>
    </div>
    <div class="flex-none gap-2">
        <div class="dropdown dropdown-end">
            <div tabindex="0" class="btn btn-ghost btn-circle avatar">
                <div class="w-10 rounded-full">
                    <img src="{user.user_metadata.avatar_url}" alt="{user.user_metadata.full_name}"/>
                </div>
            </div>
            <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                <li><a href="/app/settings">Settings</a></li>
                <li>
                    <button on:click={async () => await signOutUser()}>Logout</button>
                </li>
            </ul>
        </div>
    </div>
</div>

<div class="flex h-full">
    <div class="flex-none">
        <ul class="menu bg-secondary text-white h-full w-full">
            {#each $page.data.menu.MainLeft.menuItems as menuItem}
                <li>
                    <a href="{menuItem.route}">
                        {@html menuItem.icon}
                    </a>
                </li>
            {/each}
        </ul>
    </div>
    <div class="h-full w-screen">
        <div class="flex">
            {#if $page.data.InnerLeftMenuItems}
                <div class="flex-none w-56 mt-1">
                    <ul class="menu text-sm border-r border-r w-56 h-full">
                        {#each $page.data.InnerLeftMenuItems as menuItem}
                            <li class="font-bold text-secondary">
                                <div>
                                    {#if menuItem.headingIcon}
                                        <span class="w-4 h-4">
                                            <svelte:component this={menuItem.headingIcon}/>
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
                                            <svelte:component this={menuItem.icon}/>
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
            <div class="flex-auto w-64 mt-3 ml-3">
                <slot/>
            </div>
        </div>
    </div>
</div>

