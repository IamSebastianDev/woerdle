<script>
	import {
		Menu,
		Gear,
		InfoCircle,
		BarChartAlternative,
	} from 'svelte-pangolicons';
	import SquareButton from '../components/UI/SquareButton.svelte';
	import { toggleNav } from '../stores/menu.store.js';
	import { openModal } from '../stores/modal.store.js';
	import { theme } from '../stores/theme.store.js';
	$: attrs = { strokeWidth: $theme === 'dark' ? 2.5 : 2 };
</script>

<nav
	class="fixed top-0 z-40 w-screen border-b border-b-zinc-500 bg-white px-4 dark:bg-zinc-900"
>
	<ul class="flex h-14 flex-row items-center justify-center">
		<li>
			<SquareButton on:click={toggleNav}>
				<Menu {...attrs} />
			</SquareButton>
		</li>
		<li>
			<SquareButton on:click={openModal.bind(null, 1)}>
				<InfoCircle {...attrs} />
			</SquareButton>
		</li>
		<li class="font-mw mx-auto p-2 text-3xl font-black">
			<h1>Wørdle</h1>
		</li>
		<li>
			<SquareButton>
				<BarChartAlternative {...attrs} />
			</SquareButton>
		</li>
		<li>
			<SquareButton on:click={openModal.bind(null, 0)}>
				<Gear {...attrs} />
			</SquareButton>
		</li>
	</ul>
</nav>
