<script>
	import { joinClassNames as cls } from '../../scripts/joinClassNames.util.js';
	import { fly } from 'svelte/transition';
	import { sineInOut } from 'svelte/easing';

	import { createEventDispatcher } from 'svelte';

	import { overlay } from '../../stores/modal.store.js';

	const dispatch = createEventDispatcher();
	const close = () => dispatch('close');

	import { X } from 'svelte-pangolicons';
	import SquareButton from '../UI/SquareButton.svelte';

	export let title;
</script>

<div
	class="fixed inset-0 isolate z-50 flex flex-col items-center justify-center"
>
	<section
		class={cls(
			'bg-white p-4 dark:bg-zinc-900 dark:text-white',
			!$overlay
				? 'fixed inset-0'
				: 'm-2 rounded-lg border border-zinc-700 shadow-lg'
		)}
		transition:fly={{ y: 50, easing: sineInOut, duration: 200 }}
	>
		<div class="relative mx-auto flex max-w-md flex-col">
			<div class="mb-3 flex flex-row items-center justify-between">
				<h3
					class="font-mw mx-12 w-full text-center text-xl font-black tracking-wider"
				>
					{title.toUpperCase()}
				</h3>
				<div class="absolute right-0">
					<SquareButton on:click={close}>
						<X strokeWidth="4" size="16" />
					</SquareButton>
				</div>
			</div>
			<slot />
		</div>
	</section>
</div>
