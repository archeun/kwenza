<script xmlns="http://www.w3.org/1999/html">
    import Intl from '$lib/core/util/Config'

    export let data;
</script>

<form class="mt-3">
    <div class="form-control">
        <label class="border-l-4 border-l-gray-400 text-secondary pl-2 text-sm font-bold">
            <span>Name</span>
        </label>
        <div contenteditable="true" class="text-sm mt-1 p-1">
            {data.todo.name}
        </div>
    </div>
    <div class="form-control mt-6">
        <label class="border-l-4 border-l-gray-400 pl-2 text-secondary text-sm font-bold">
            <span>Due Date</span>
        </label>
        <input value="{Intl.formatDateTimeForDatePicker(data.todo.due_at)}" type="datetime-local"
               class="text-sm pt-2 pb-2"/>
    </div>
    <div class="form-control mt-6">
        <label class="cursor-pointer flex bg-{data.todo.is_completed ? 'success' : 'secondary'} p-1.5 rounded-md">
            <input type="checkbox" checked="{data.todo.is_completed ? 'checked' : ''}" class="checkbox border border-white"/>
            <span class="label-text mt-0.5 ml-3 font-bold text-white">{data.todo.is_completed ? 'Completed' : 'Mark as Completed'}</span>
        </label>
    </div>

</form>

