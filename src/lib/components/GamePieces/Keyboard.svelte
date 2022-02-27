<script>
	import { FnReturn, FnBackspace } from 'svelte-pangolicons';
	import Key from './Key.svelte';

	import keyboard from '../../data/keyboard.data.js';
	import { gameState } from '../../stores/gamestate.store.js';

	const keyRows = Object.values(keyboard);
	$: ({ evaluatedKeys } = $gameState);
	$: getKeyState = (char) => evaluatedKeys[char];

	const setKey = (char) => () =>
		gameState.dispatch({
			type: !['deleteKey', 'eval'].includes(char) ? 'addKey' : char,
			payload: char,
		});
</script>

<div class="mx-auto grid h-48 w-full max-w-lg grid-rows-3 py-2">
	{#each keyRows as row}
		<div class="mx-2 flex h-full flex-row justify-center pb-1 sm:even:mx-9">
			{#each row as key}
				<Key on:click={setKey(key.char)} state={getKeyState(key.char)}>
					{#if key.char === 'eval'}
						<FnReturn class="sm:mx-6" />
					{:else if key.char === 'deleteKey'}
						<FnBackspace class="sm:mx-6" />
					{:else}
						{key.char.toUpperCase()}
					{/if}
				</Key>
			{/each}
		</div>
	{/each}
</div>
