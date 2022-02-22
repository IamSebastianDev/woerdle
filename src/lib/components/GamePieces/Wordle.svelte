<script>
	import Letterbox from '../components/GamePieces/Letterbox.svelte';
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
		if (ev.key === 'Meta' || ev.key === ' ') return;

		if (ev.key === 'Enter') {
			updateGameState({ type: 'eval' });
			return;
		}

		if (ev.key === 'Backspace') {
			updateGameState({ type: 'delete' });
			return;
		}

		updateGameState({ type: 'key', payload: ev.key });
		return;
	};
</script>

<svelte:window on:keydown={handleKey} />

<section id="wordle" class="mt-16 flex h-[70vh] flex-col justify-center">
	<div class="mx-auto grid grid-cols-5 grid-rows-6 gap-1">
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
