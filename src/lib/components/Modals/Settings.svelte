<script>
	import { i18n } from '../../i18n/i18n.store';
	$: ({ t, currentLocale } = i18n);

	import Modal from '../UI/Modal.svelte';
	import { modal } from '../../stores/modal.store.js';
	import { gameState } from '../../stores/gamestate.store.js';
	import { theme } from '../../stores/theme.store';

	import Toggle from '../UI/Toggle.svelte';
	import Button from '../UI/Button.svelte';
	import { RefreshCW, Github, Twitter } from 'svelte-pangolicons';

	const toggleHardMode = (ev) => {
		gameState.dispatch({ type: 'mode', payload: ev.target.checked });
	};

	const toggleTheme = (ev) => {
		theme.update((state) => (state === 'dark' ? 'light' : 'dark'));
	};

	const toggleLocale = (ev) => {
		currentLocale.set(ev.target.checked ? 'en' : 'de');
	};
</script>

<Modal
	on:close={() => modal.dispatch({ type: 'close' })}
	title={$t('settings.heading')}
>
	<Toggle
		title={$t('settings.theme.heading')}
		id="theme"
		checked={$theme === 'dark'}
		description={$t('settings.theme.description')}
		on:change={toggleTheme}
	/>
	<Toggle
		title={$t('settings.hardMode.heading')}
		id="hardmode"
		checked={$gameState.hardmode}
		description={$t('settings.hardMode.description')}
		on:change={toggleHardMode}
	/>
	<Toggle
		title={$t('settings.localeSelect.heading')}
		id="locale"
		checked={$currentLocale === 'en'}
		description={$t('settings.localeSelect.description')}
		on:change={toggleLocale}
	/>
	<Button
		title="Get a new Wordle"
		id="refresh"
		description="Waiting 24 hours is boring"
		on:click={() => gameState.dispatch({ type: 'reset' })}
	>
		<RefreshCW class="motion-safe:animate-spin" />
	</Button>
	<a
		class="group flex w-full flex-row items-center justify-between border-b border-b-zinc-700 py-5 text-lg font-bold"
		href="https://github.com/IamSebastianDev/woerdle"
		rel="noreferrer noopener"
		target="_blank"
	>
		<p class="mr-4 text-zinc-700 group-hover:underline dark:text-white">
			{$t('settings.links.github')}
		</p>
		<Github class="mx-3" />
	</a>
	<a
		class="group flex w-full flex-row items-center justify-between border-b border-b-zinc-700 py-5 text-lg font-bold"
		href="https://twitter.com/IamSebastianDev"
		rel="noreferrer noopener"
		target="_blank"
	>
		<p class="mr-4 text-zinc-700 group-hover:underline dark:text-white">
			{$t('settings.links.twitter')}
		</p>
		<Twitter class="mx-3" />
	</a>
</Modal>
