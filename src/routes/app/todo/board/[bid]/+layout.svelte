<script>
    import Intl from '$lib/core/util/Config'

    export let data;
</script>
<div class="flex flex-row min-h-screen h-max">
    <div class="basis-3/5 border-r">
        <div class="text-sm font-bold mb-3 mt-3 text-secondary">Todo Items in Board</div>
        <ul>
            {#each data.todosInBoard as todo}
                <li class="cursor-pointer mt-3">
                    <a href="/app/todo/board/{data.boardId}/todo/{todo.id}">
                        <div class="card w-[625px] bg-base-100 shadow-sm shadow-gray-400 rounded-sm text-sm hover:bg-primary
            hover:bg-opacity-10 border-l-4 border-l-{todo.is_completed ? 'success' : 'neutral'}">
                            <div class="card-body p-2">
                                <p>{todo.name}</p>
                                <div class="justify-start text-xs">
                                    <span class="text-gray-500 font-bold">Due on: {Intl.formatDateTime(todo.due_at)}</span>
                                </div>
                            </div>
                        </div>
                    </a>
                </li>
            {/each}
        </ul>
    </div>
    <div class="basis-2/5 pl-3 pr-3">
        <slot/>
    </div>

</div>

