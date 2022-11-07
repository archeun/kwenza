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

<form class="form-widget" on:submit|preventDefault="{updateProfile}">
    <img alt="{username}" src="{avatarUrl}">
    <div>
        <label for="email">Email</label>
        <input id="email" type="text" value="{session.user.email}" disabled/>
    </div>
    <div>
        <label for="username">Name</label>
        <input id="username" type="text" bind:value="{username}"/>
    </div>

    <div>
        <input type="submit" class="button block primary" value={loading ? 'Loading...' : 'Update'}
               disabled={loading}/>
    </div>
</form>