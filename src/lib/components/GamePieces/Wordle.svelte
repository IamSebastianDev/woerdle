<script>
	import Toast from '../UI/Toast.svelte';
	import Letterbox from './Letterbox.svelte';
	import {
		gameState,
		updateGameState,
	} from '../../stores/gamestate.store.js';

	$: words = $gameState.boardState.map((word) => {
		let empty = [...word];
		empty.length = 5;
		return empty.fill('', word.length, 5);
	});

	$: ({ evaluations, rowIndex } = $gameState);

	const handleKey = (ev) => {
		if (ev.key === 'Enter') {
			updateGameState({ type: 'eval' });
			return;
		}

		if (ev.key === 'Backspace') {
			updateGameState({ type: 'delete' });
			return;
		}

		if (ev.key.length !== 1 || ev.key === ' ') return;

		updateGameState({ type: 'key', payload: ev.key.toLowerCase() });
		return;
	};

	$: console.log({ $gameState });
</script>

<svelte:window on:keydown={handleKey} />

<section
	id="wordle"
	class="mt-[8.5vh] flex h-[66.5vh] flex-col items-center justify-center"
>
	<Toast />
	<div class="mx-auto grid grid-cols-5 grid-rows-6 gap-[5px]">
		{#each words as word, i (i)}
			{#each word as letter, j (j)}
				<Letterbox
					char={letter}
					state={evaluations[i] && evaluations[i][j]}
					externalDelay={250 * j}
				/>
			{/each}
		{/each}
	</div>
</section>
