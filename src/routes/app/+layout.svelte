<script>
    import {supabaseClient} from '$lib/util/supabaseClient'
    import {page} from '$app/stores'
    import {invalidate} from '$app/navigation'
    import {onMount} from 'svelte'
    import logo from '$lib/assets/navbar-logo.png';
    import '../../app.css'
    import {signOutUser} from "../../lib/util/Auth.js";

    const user = $page.data.session.user;

    onMount(() => {
        const {
            data: {subscription},
        } = supabaseClient.auth.onAuthStateChange(() => {
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
                <li><a href="/app/account">Account</a></li>
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
            <li>
                <a href="/app">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"/>
                        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"/>
                    </svg>
                </a>
            </li>
            <li>
                <a href="/app/todo">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path d="M5.625 3.75a2.625 2.625 0 100 5.25h12.75a2.625 2.625 0 000-5.25H5.625zM3.75 11.25a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75zM3 15.75a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75zM3.75 18.75a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75z"/>
                    </svg>
                </a>
            </li>
        </ul>
    </div>
    <div class="h-full w-screen">
        <slot/>
    </div>
</div>

