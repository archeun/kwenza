<script>
    import {page} from '$app/stores'
    import bannerLogo from '$lib/assets/banner-logo.png';
    import GoogleSignInButton from "../lib/components/GoogleSignInButton.svelte";
</script>

{#if !$page.data.session}
    <div class="dark:bg-gray-900">
        <section class="mx-auto container w-full">
            <div class="flex flex-col justify-center items-center">
                <img alt="Kwenza banner logo" src={bannerLogo}/>
                <div class="text-6xl">···</div>
                <div class="md:text-4xl text-3xl font-black text-center text-gray-800 dark:text-white leading-snug lg:w-3/4">
                    <h2>All-in-one Productivity Toolkit</h2>
                </div>
                <div class="text-6xl">·</div>
                <div class="flex justify-center items-center">
                    <GoogleSignInButton/>
                </div>
            </div>
        </section>
    </div>
{/if}