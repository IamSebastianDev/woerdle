<script>
	import { toast } from '../../stores/toast.store.js';
	import { fade } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
</script>

{#if $toast.visible}
	<div
		in:fade={{ easing: quintInOut, duration: 150 }}
		out:fade={{ easing: quintInOut, duration: 350 }}
		class="fixed top-20 z-[100] mx-auto self-center rounded-md border border-zinc-700 bg-zinc-700 py-3 px-4 font-bold text-zinc-200 shadow-md dark:bg-zinc-200 dark:text-zinc-700"
	>
		{$toast.message}
	</div>
{/if}
