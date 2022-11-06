<script type="text/javascript">
    import "./app.css";
    import {onMount} from 'svelte'
    import {supabase} from './supabaseClient'
    import Account from './lib/Account.svelte'
    import Auth from './lib/Auth.svelte'

    let session;

    onMount(() => {
        supabase.auth.getSession().then(({data}) => {
            session = data.session
        })

        supabase.auth.onAuthStateChange((_event, _session) => {
            session = _session
        })
    })
</script>

<div class="container" style="padding: 50px 0 100px 0">
    <h1 class="text-3xl font-bold underline">
        Hello world!
    </h1>
    {#if !session}
        <Auth/>
    {:else}
        <Account {session}/>
    {/if}
</div>