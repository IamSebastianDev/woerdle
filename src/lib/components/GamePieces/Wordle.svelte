<script>

	import Letterbox from './Letterbox.svelte';
	import { gameState } from '../../stores/gamestate.store.js';

	$: words = $gameState.boardState.map((word) => {
		let empty = [...word];
		empty.length = 5;
		return empty.fill('', word.length, 5);
	});

	$: ({ evaluations } = $gameState);

	const handleKey = (ev) => {
		if (ev.key === 'Enter') {
			gameState.dispatch({ type: 'eval' });
			return;
		}

		if (ev.key === 'Backspace') {
			gameState.dispatch({ type: 'deleteKey' });
			return;
		}

		if (ev.key.length !== 1 || ev.key === ' ') return;

		gameState.dispatch({ type: 'addKey', payload: ev.key.toLowerCase() });
		return;
	};
</script>

<svelte:window on:keydown={handleKey} />

<section
	id="wordle"
	class="mt-16 flex flex-1 scale-75 transform flex-col items-center justify-center justify-self-center sm:scale-100"
>

	<div class=" mx-auto grid grid-cols-5 grid-rows-6 gap-[5px]">
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
