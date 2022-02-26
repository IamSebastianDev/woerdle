<script>
	import { fly } from 'svelte/transition';
	import { sineInOut } from 'svelte/easing';

	import { X } from 'svelte-pangolicons';
	import SquareButton from '../UI/SquareButton.svelte';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	const close = () => dispatch('close');

	import { theme } from '../../stores/theme.store.js';
	const attrs = { strokeWidth: $theme === 'dark' ? 4 : 3, size: 16 };
</script>

<aside
	transition:fly={{ easing: sineInOut, x: -500, duration: 350 }}
	class="fixed left-0 top-0 bottom-0 z-30 flex h-screen w-full max-w-sm flex-col border-r border-zinc-200 px-4 pt-20 pb-4 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
>
	<div class="flex flex-row justify-between">
		<h3 class="font-mw text-xl font-black">Wørdle</h3>
		<SquareButton on:click={close}>
			<X {...attrs} />
		</SquareButton>
	</div>
	<div
		class="mt-auto space-y-2 border-t border-zinc-700 pt-4 text-center text-sm text-zinc-500"
	>
		<p>
			Lovingly 💖 built with <a
				class="underline hover:text-white"
				href="https://svelte.dev"
				target="_blank"
				rel="noreferrer noopener">Svelte</a
			>
			&
			<a
				class="underline hover:text-white"
				href="https://tailwindcss.com"
				target="_blank"
				rel="noreferrer noopener">TailwindCSS</a
			>.
		</p>
		<p>
			&copy; {new Date().getFullYear()}
			<a
				class="underline hover:text-white"
				href="https://iamsebastian.dev"
				target="_blank"
				rel="noreferrer noopener"
			>
				Sebastian Heinz</a
			>
		</p>
	</div>
</aside>
