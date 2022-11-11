<script>
    import {onMount} from 'svelte';
    import {page} from '$app/stores';
    import {getUserProfile, updateUserProfile} from "../../../lib/util/Auth.js";

    let session = $page.data.session;
    let notifications = $page.data.notifications;
    let loading = false
    let username = null
    let avatarUrl = null

    onMount(() => {
        getProfile()
    })

    const getProfile = async () => {
        try {
            loading = true
            const {user} = session
            const data = await getUserProfile(user.id)
            if (data) {
                username = data.username
                avatarUrl = data.avatar_url
            }
        } catch (error) {
            notifications.danger(
                'An error occurred when trying to fetch the profile. Please try again later.'
            )
        } finally {
            loading = false
        }
    }

    const updateProfile = async () => {
        try {
            loading = true
            const {user} = session
            await updateUserProfile({
                id: user.id,
                username,
                avatar_url: avatarUrl,
                updated_at: new Date(),
            });
        } catch (error) {
            notifications.danger(
                'An error occurred when trying to update the profile. Please try again later.'
            )
        } finally {
            loading = false
        }
    }
</script>

<div class="flex h-full">
    <div class="flex-none w-40 ml-4">
        <ul class="menu text-sm border-r border-r w-40 p-2 h-full">
            <li class="rounded-md mt-4">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd"
                              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                              clip-rule="evenodd"/>
                    </svg>
                    <span>Profile</span>
                </div>
            </li>
        </ul>
    </div>
    <div class="flex-auto w-64">
        <div class="card rounded-md w-full">
            <div class="card-body">
                <h2 class="card-title border-b text-primary pb-2=">Basic Information</h2>
                <form class="form-widget mt-2" on:submit|preventDefault="{updateProfile}">
                    <img alt="{username}" src="{avatarUrl}">
                    <div>
                        <div class="label font-bold text-sm">Email</div>
                        <input type="text" value="{session.user.email}" id="email"
                               class="input input-bordered input-sm w-full max-w-xs" disabled/>
                    </div>
                    <div>
                        <div class="label font-bold text-sm">Name</div>
                        <input type="text" bind:value="{username}" id="username"
                               class="input input-bordered input-sm w-full max-w-xs"/>
                    </div>
                    <div class="card-actions justify-start mt-5">
                        <input type="submit" class="btn btn-sm btn-secondary" value={loading ? 'Loading...' : 'Update'}
                               disabled={loading}/>
                    </div>
                </form>
            </div>
        </div>

    </div>
</div>
