<script>
	import { joinClassNames as cls } from '../../scripts/joinClassNames.util';
	export let state = undefined;
</script>

{#key state}
	<button
		tabindex="-1"
		on:click
		class={cls(
			'm-0.5 grid flex-1 grow touch-manipulation select-none appearance-none place-items-center rounded-md text-sm font-bold',
			state === 'correct' ? 'bg-green-500 text-white' : '',
			state === 'present' ? 'bg-yellow-500 text-white' : '',
			state === 'absent' ? 'bg-zinc-500 text-white dark:bg-zinc-700' : '',
			!state
				? 'bg-zinc-300 text-zinc-700  dark:bg-zinc-500 dark:text-white'
				: ''
		)}
	>
		<slot />
	</button>
{/key}
