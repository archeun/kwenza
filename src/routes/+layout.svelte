<script>
    import {supabaseClient} from '$lib/util/supabaseClient'
    import {invalidate} from '$app/navigation'
    import {onMount} from 'svelte'
    import '../app.css'
    import Toast from "../lib/components/Toast.svelte";

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

<div style="height: 89.5vh;">
    <slot/>
</div>
<Toast />