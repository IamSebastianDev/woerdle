<script>
	import {
		Menu,
		Gear,
		InfoCircle,
		BarChartAlternative,
	} from 'svelte-pangolicons';
	import Aside from './Aside.svelte';
	import SquareButton from '../UI/SquareButton.svelte';
	import { openModal } from '../../stores/modal.store.js';
	import { theme } from '../../stores/theme.store.js';
	$: attrs = { strokeWidth: $theme === 'dark' ? 2.5 : 2 };

	let showAside = false;
</script>

<nav
	class="fixed top-0 z-40 w-screen border-b border-b-zinc-500 bg-white px-4 dark:bg-zinc-900"
>
	<ul class="flex h-14 flex-row items-center justify-center">
		<li>
			<SquareButton on:click={() => (showAside = !showAside)}>
				<Menu {...attrs} />
			</SquareButton>
		</li>
		<li>
			<SquareButton on:click={openModal.bind(null, 1, false)}>
				<InfoCircle {...attrs} />
			</SquareButton>
		</li>
		<li class="font-mw mx-auto p-2 text-3xl font-black">
			<h1>Wørdle</h1>
		</li>
		<li>
			<SquareButton on:click={openModal.bind(null, 2, true)}>
				<BarChartAlternative {...attrs} />
			</SquareButton>
		</li>
		<li>
			<SquareButton on:click={openModal.bind(null, 0, false)}>
				<Gear {...attrs} />
			</SquareButton>
		</li>
	</ul>
</nav>
{#if showAside}
	<Aside on:close={() => (showAside = !showAside)} />
{/if}
