<script>
    import {SupabaseClient} from '$lib/core/util/SupabaseClient'
    import {invalidate} from '$app/navigation'
    import {onMount} from 'svelte'
    import '../app.css'
    import Toast from "$lib/core/components/Toast.svelte";

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

<div style="height: 89.5vh;">
    <slot/>
</div>
<Toast />