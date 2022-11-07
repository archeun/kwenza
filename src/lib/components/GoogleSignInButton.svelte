<script>
    import {supabaseClient} from '$lib/util/supabaseClient'

    async function signInWithGoogle() {
        const {data, error} = await supabaseClient.auth.signInWithOAuth({
            provider: 'google',
        })
    }
</script>

<div class="row flex-center flex">
    <button on:click={signInWithGoogle} class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-800 hover:opacity-90 w-72 h-12 text-lg text-white bg-gradient-to-l from-indigo-600 to-indigo-700 rounded">
        Sign in with Google 🠒
    </button>
</div>