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

<div class="">
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
