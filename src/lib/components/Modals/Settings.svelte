<script>
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
</script>

<Modal on:close={() => modal.dispatch({ type: 'close' })} title="Settings">
	<Toggle
		title="Dark Theme"
		id="theme"
		checked={$theme === 'dark'}
		description="Toggle between dark & light theme"
		on:change={toggleTheme}
	/>
	<Toggle
		title="Hard Mode"
		id="theme"
		checked={$gameState.hardmode}
		description="Any revealed hints must be used in subsequent guesses"
		on:change={toggleHardMode}
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
		class="group my-3 flex w-full flex-row items-center justify-between text-lg font-bold"
		href="https://github.com/IamSebastianDev/woerdle"
		rel="noreferrer noopener"
		target="_blank"
	>
		<p class="mr-4 text-zinc-700 group-hover:underline dark:text-white">
			Find this Project on Github
		</p>
		<Github class="mx-3" />
	</a>
	<a
		class="group my-3 flex w-full flex-row items-center justify-between text-lg font-bold"
		href="https://twitter.com/IamSebastianDev"
		rel="noreferrer noopener"
		target="_blank"
	>
		<p class="mr-4 text-zinc-700 group-hover:underline dark:text-white">
			Find me on Twitter
		</p>
		<Twitter class="mx-3" />
	</a>
</Modal>
