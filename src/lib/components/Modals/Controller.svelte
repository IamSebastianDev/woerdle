<script>
	import Settings from './Settings.svelte';
	import Stats from './Stats.svelte';
	import Instructions from './Instructions.svelte';
	import { gameState } from '../../stores/gamestate.store';
	import { modal, initalModal } from '../../stores/modal.store';
	import { onMount } from 'svelte';

	let modals = { Settings, Stats, Instructions };

	/**
	 * On pageload, check if the instrucionmodal should be shown and dispatch a
	 * opening request if ncessary.
	 */

	onMount(() => {
		$initalModal.show &&
			modal.dispatch({
				type: 'instructions',
				payload: { overlay: true },
			});
		$gameState.status.includes('ended') &&
			modal.dispatch({
				type: 'stats',
				payload: { overlay: true },
			});
	});
</script>

<section id="modals">
	<svelte:component this={modals[$modal.active]} />
</section>
