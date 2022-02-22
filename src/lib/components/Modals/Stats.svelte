<script>
	import { joinClassNames as cls } from '../../scripts/joinClassNames.util.js';
	import { RefreshCW } from 'svelte-pangolicons';
	import Modal from '../UI/Modal.svelte';
	import Button from '../UI/Button.svelte';
	import { activeModal, closeModal } from '../../stores/modal.store.js';

	import { stats } from '../../stores/statistics.store.js';
	import { resetGameState } from '../../stores/gamestate.store.js';

	$: values = Object.values($stats.guesses).slice(0, 6);
	$: maxValue = Math.max(...values);
	$: maxIndex = values.indexOf(maxValue);

	const refreshHandler = () => {
		closeModal();
		resetGameState();
	};
</script>

{#if $activeModal === 2}
	<Modal on:close={closeModal} title="Statistics">
		<div class="p-10">
			<div class="mb-4 flex space-x-2">
				<div class="flex-1 text-center">
					<p class="text-4xl font-bold">{$stats.gamesPlayed}</p>
					<p class="text-xs">Played</p>
				</div>
				<div class="flex-1 text-center">
					<p class="text-4xl font-bold">
						{Math.floor(
							(100 * $stats.gamesWon) / $stats.gamesPlayed
						)}
					</p>
					<p class="text-xs">Win %</p>
				</div>
				<div class="flex-1 text-center">
					<p class="text-4xl font-bold">{$stats.currentStreak}</p>
					<p class="text-xs">Current Streak</p>
				</div>
				<div class="flex-1 text-center">
					<p class="text-4xl font-bold">{$stats.maxStreak}</p>
					<p class="text-xs">Max Streak</p>
				</div>
			</div>
			<div class="mb-4 flex flex-col">
				<h3 class="pb-2 text-center text-lg font-semibold uppercase">
					Guess distribution
				</h3>
				{#each values as guess, i}
					<div
						class="flex flex-row items-center justify-start pb-1 text-sm"
					>
						<div class="w-4">{i + 1}</div>
						<span
							style:width={`${(100 * guess) / maxValue}%`}
							class={cls(
								'box-border flex min-w-min flex-row items-center justify-end rounded-sm px-2 text-center',
								i === maxIndex
									? 'bg-green-500'
									: '-translate-x-[2px] transform bg-zinc-200 dark:bg-zinc-700'
							)}
						>
							{guess}
						</span>
					</div>
				{:else}
					<p>No data.</p>
				{/each}
			</div>
			<hr class="my-4 border-zinc-500" />
			<Button
				title="Get a new Wordle"
				id="refresh"
				description="Waiting 24 hours is boring"
				on:click={refreshHandler}
			>
				<RefreshCW />
			</Button>
		</div>
	</Modal>
{/if}
