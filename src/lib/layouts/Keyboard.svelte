<script>
	import { FnReturn, FnBackspace } from 'svelte-pangolicons';
	import Key from '../components/GamePieces/Key.svelte';

	import keyboard from '../data/keyboard.data.js';
	import { updateGameState, gameState } from '../stores/gamestate.store.js';

	const keyRows = Object.values(keyboard);
	$: ({ evaluatedKeys } = $gameState);
	$: getKeyState = (char) => evaluatedKeys[char];

	const setKey = (char) => () =>
		updateGameState({
			type: !['delete', 'eval'].includes(char) ? 'key' : char,
			payload: char,
		});
</script>

<div class="mx-auto grid h-[25vh] w-full max-w-lg grid-rows-3 py-2">
	{#each keyRows as row}
		<div class="mx-2 flex h-full flex-row justify-center pb-1">
			{#each row as key}
				<Key
					on:click={setKey(key.char || key.icon)}
					state={getKeyState(key.char)}
				>
					{#if key.icon === 'eval'}
						<FnReturn />
					{:else if key.icon === 'delete'}
						<FnBackspace />
					{:else}
						{key.char.toUpperCase()}
					{/if}
				</Key>
			{/each}
		</div>
	{/each}
</div>
