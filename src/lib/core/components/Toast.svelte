<script>
    import {flip} from "svelte/animate";
    import {fly} from "svelte/transition";
    import {notifications} from "$lib/store/notifications";
</script>

<div>
    {#each $notifications as notification (notification.id)}
        <div animate:flip transition:fly={{ y: 30 }} class="toast toast-top toast-center w-96 z-50">
            <div class="alert alert-{notification.type}">
                <div><span><i class={notification.icon}></i> {notification.message}</span></div>
            </div>
        </div>
    {/each}
</div>

