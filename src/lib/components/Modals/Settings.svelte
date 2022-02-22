<script>
	import Modal from '../UI/Modal.svelte';
	import { activeModal, closeModal } from '../../stores/modal.store.js';
	import { resetGameState } from '../../stores/gamestate.store.js';

	import Toggle from '../UI/Toggle.svelte';
	import Button from '../UI/Button.svelte';
	import { RefreshCW } from 'svelte-pangolicons';

	import { theme, toggleColourTheme } from '../../stores/theme.store';
</script>

{#if $activeModal === 0}
	<Modal on:close={closeModal} title="Settings">
		<Toggle
			title="Dark Theme"
			id="theme"
			checked={$theme === 'dark'}
			description="Toggle between dark & light theme"
			on:change={toggleColourTheme}
		/>
		<Button
			title="Get a new Wordle"
			id="refresh"
			description="Waiting 24 hours is boring"
			on:click={resetGameState}
		>
			<RefreshCW />
		</Button>
	</Modal>
{/if}
