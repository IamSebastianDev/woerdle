<script>
	import { i18n } from '../../i18n/i18n.store';
	$: ({ t, currentLocale } = i18n);

	import { joinClassNames as cls } from '../../scripts/joinClassNames.util';
	import { RefreshCW } from 'svelte-pangolicons';
	import Modal from '../UI/Modal.svelte';
	import Button from '../UI/Button.svelte';
	import { modal } from '../../stores/modal.store.js';

	import { stats } from '../../stores/statistics.store.js';
	import { gameState } from '../../stores/gamestate.store.js';
	$: ({ rowIndex, status } = $gameState);

	$: values = Object.values($stats.guesses).slice(0, 6);
	$: maxValue = Math.max(...values);
	$: average =
		values.reduce((a, b, i) => a + b * (i + 1), 0) / $stats.gamesWon;

	const refreshHandler = () => {
		modal.dispatch({ type: 'close' });
		gameState.dispatch({ type: 'reset' });
	};
</script>

<Modal
	on:close={() => modal.dispatch({ type: 'close' })}
	title={$t('stats.heading')}
>
	<div class="p-10">
		<div class="mb-4 flex space-x-2 text-center">
			<div class="flex-1">
				<p class="text-4xl font-bold">{$stats.gamesPlayed}</p>
				<p class="text-xs">{$t('stats.played')}</p>
			</div>
			<div class="flex-1">
				<p class="text-4xl font-bold">
					{Math.floor((100 * $stats.gamesWon) / $stats.gamesPlayed) ||
						0}
				</p>
				<p class="text-xs">{$t('stats.percentage')}</p>
			</div>
			<div class="flex-1">
				<p class="text-4xl font-bold">{$stats.currentStreak}</p>
				<p class="text-xs">{$t('stats.current')}</p>
			</div>
			<div class="flex-1">
				<p class="text-4xl font-bold">{$stats.maxStreak}</p>
				<p class="text-xs">{$t('stats.max')}</p>
			</div>
		</div>
		<div class="mb-4 flex flex-col">
			<h3 class="pb-2 text-center text-lg font-semibold uppercase">
				{$t('stats.guesses')}
			</h3>
			{#each values as guess, i}
				<div
					style="grid-template-columns: 1em 1fr"
					class="grid pb-1 text-sm"
				>
					<div class="w-4">{i + 1}</div>
					<span
						style:width={`${(100 * guess) / maxValue}%`}
						class={cls(
							'box-border flex min-w-[9.25%] flex-row items-center justify-end rounded-sm px-2 text-center',
							status === 'ended__win' && rowIndex === i
								? 'bg-green-500'
								: 'mr-auto bg-zinc-200 dark:bg-zinc-700'
						)}
					>
						{guess}
					</span>
				</div>
			{:else}
				<p>{$t('stats.nodata')}</p>
			{/each}
		</div>
		<div class="flex justify-center space-x-4 text-sm">
			<p>{$t('stats.failed')}<strong>{$stats.guesses.failed}</strong></p>
			<p>{$t('stats.average')}<strong>{average.toFixed(2)}</strong></p>
		</div>
		<hr class="mt-4 border-zinc-500" />
		<Button
			title={$t('refresh.heading')}
			id="refresh"
			description={$t('refresh.description')}
			on:click={refreshHandler}
		>
			<RefreshCW class="motion-safe:animate-spin" />
		</Button>
	</div>
</Modal>
