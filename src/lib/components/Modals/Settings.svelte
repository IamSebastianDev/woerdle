<script>
	import Modal from '../UI/Modal.svelte';
	import { activeModal, closeModal } from '../../stores/modal.store';

	import Toggle from '../UI/Toggle.svelte';

	import { theme, toggleColourTheme } from '../../stores/theme.store';
</script>

{#if $activeModal === 0}
	<Modal on:close={closeModal} title="Settings">
		<Toggle
			title="Dark Theme"
			id="theme"
			checked={$theme === 'dark'}
			on:change={toggleColourTheme}
			description="Toggle between dark & light theme"
		/>
		<Toggle
			title="Hard Mode"
			id="difficulty"
			checked={false}
			description="Any revealed hints must be used in subsequent guesses"
		/>
	</Modal>
{/if}
