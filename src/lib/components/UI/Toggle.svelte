<script>
	export let title;
	export let id;
	export let description = '';
	export let checked;
</script>

<div
	class="my-1 flex w-full flex-row items-center justify-between border-b border-b-zinc-700 py-3"
>
	<div class="mr-4">
		<p class="text-lg font-bold text-zinc-700 dark:text-white">
			{title}
		</p>
		{#if description !== ''}
			<p class="text-sm text-zinc-500">
				{description}
			</p>
		{/if}
	</div>
	<label class="hidden" for={id}>{title}</label>
	<input
		on:change
		bind:checked
		class="relative flex h-7 w-12 shrink-0 cursor-pointer appearance-none flex-row items-center rounded-full border border-zinc-500 bg-transparent duration-200 before:absolute before:mx-1 before:block before:h-5 before:w-5 before:scale-100 before:rounded-full before:bg-zinc-500 before:transition-all before:duration-200 before:ease-in-out after:absolute after:right-0 after:mx-1 after:block after:h-5 after:w-5 after:-translate-x-full after:scale-x-110 after:scale-y-50 after:transform after:rounded-full after:bg-amber-500 after:opacity-0 after:transition-all after:duration-200 after:ease-in-out before:checked:translate-x-full before:checked:scale-x-110 before:checked:scale-y-50 before:checked:transform before:checked:opacity-0 after:checked:translate-x-0 after:checked:scale-100 after:checked:opacity-100"
		{id}
		name={id}
		type="checkbox"
	/>
</div>
