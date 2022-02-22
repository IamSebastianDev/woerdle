<script>
	export let title;
	export let id;
	export let description = '';
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
	<button
		class="flex w-12 flex-row items-center justify-center"
		{id}
		on:click
	>
		<slot />
	</button>
</div>
