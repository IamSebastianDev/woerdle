<script>
	import { joinClassNames as cls } from '../../scripts/joinClassNames.util.js';
	import { quintOut, backInOut } from 'svelte/easing';

	export let char = '';
	export let state = undefined;
	export let externalDelay = 0;

	const flip = (node, options) => {
		return {
			css: (t) => {
				let scale = t * 2 - 1;
				return `
					filter: saturate(${t}) contrast(${t});
					transform: scaleY(${scale})
				`;
			},
			easing: quintOut,
			duration: 750,
			delay: 250 + externalDelay,
		};
	};

	const plop = (node, options) => {
		return {
			css: (t) => {
				const scale = ((t - 0) / (1 - 0)) * (1 - 0.9) + 0.9;

				return `
					transform: scale(${scale})
				`;
			},
			easing: backInOut,
			duration: 250,
		};
	};

	$: animate = !state ? plop : flip;
	$: change = state || char;
</script>

{#key change}
	<div
		in:animate
		class={cls(
			'grid aspect-square h-16 w-16 place-items-center border-2 text-4xl font-bold',
			state === 'correct'
				? 'border-green-500 bg-green-500 text-white'
				: '',
			state === 'present'
				? 'border-yellow-500 bg-yellow-500 text-white'
				: '',
			state === 'absent' ? ' border-zinc-500 bg-zinc-500 text-white' : '',
			!state ? 'border-zinc-300 dark:border-zinc-700' : ''
		)}
	>
		{char?.toUpperCase()}
	</div>
{/key}
