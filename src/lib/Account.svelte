<script type="text/javascript">
    import {onMount} from "svelte";
    import {supabase} from "../supabaseClient";

    export let session;

    let loading = false
    let username = null

    onMount(() => {
        getProfile()
    })

    const getProfile = async () => {
        try {
            loading = true
            const {user} = session

            const {data, error, status} = await supabase
                .from('profiles')
                .select('username')
                .eq('id', user.id)
                .single()

            if (error && status !== 406) throw error

            if (data) {
                username = data.username
            }
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        } finally {
            loading = false
        }
    }

    const updateProfile = async () => {
        try {
            loading = true
            const {user} = session

            const updates = {
                id: user.id,
                username,
                updated_at: new Date().toISOString(),
            }

            let {error} = await supabase.from('profiles').upsert(updates)

            if (error) {
                throw error
            }
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        } finally {
            loading = false
        }
    }
</script>

<form on:submit|preventDefault={updateProfile} class="form-widget">
    <div>Email: {session.user.email}</div>
    <div>
        <label for="username">Name</label>
        <input id="username" type="text" bind:value={username}/>
    </div>
    <div>
        <button type="submit" class="button primary block" disabled={loading}>
            {loading ? 'Saving ...' : 'Update profile'}
        </button>
    </div>
    <button type="button" class="button block" on:click={() => supabase.auth.signOut()}>
        Sign Out
    </button>
</form>