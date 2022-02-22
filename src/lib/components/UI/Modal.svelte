<script>
	import { fly } from 'svelte/transition';
	import { sineInOut } from 'svelte/easing';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	const close = () => dispatch('close');

	import { X } from 'svelte-pangolicons';
	import SquareButton from '../UI/SquareButton.svelte';

	export let title;
</script>

<section
	class="fixed inset-0 z-50 bg-white p-4 dark:bg-zinc-900 dark:text-white"
	transition:fly={{ y: 50, easing: sineInOut, duration: 200 }}
>
	<div class="relative mx-auto flex max-w-lg flex-col">
		<div class="mb-3 flex flex-row justify-between">
			<h3
				class="font-mw w-full text-center text-xl font-black tracking-wider"
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
