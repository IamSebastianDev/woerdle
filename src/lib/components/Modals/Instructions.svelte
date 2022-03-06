<script>
	import { i18n } from '../../i18n/i18n.store';
	$: ({ t, currentLocale } = i18n);

	import Modal from '../UI/Modal.svelte';
	import Letterbox from '../GamePieces/Letterbox.svelte';
	import { modal, initalModal } from '../../stores/modal.store';

	const closeHandler = () => {
		modal.dispatch({ type: 'close' });
		initalModal.update((state) => ({ ...state, show: false }));
	};
</script>

<Modal on:close={closeHandler} title={$t('instructions.heading')}>
	<div class="mx-auto mt-2 space-y-3 text-sm">
		<p>{@html $t('instructions.line1')}</p>
		<p>{$t('instructions.line2')}</p>
		<p>{$t('instructions.line3')}</p>
	</div>
	<hr class="my-4 border-zinc-500" />
	<div class="flex flex-col items-start">
		<p><strong>{$t('instructions.examples.heading')}</strong></p>
		<div
			class="my-1 grid origin-left scale-75 transform grid-cols-5 gap-x-2"
		>
			<Letterbox char="S" state="correct" />
			<Letterbox char="P" />
			<Letterbox char="A" />
			<Letterbox char="I" />
			<Letterbox char="N" />
		</div>
		<p class="mt-1 mb-3 text-sm">
			{$t('instructions.examples.line1', { letter: 'S' })}
		</p>
		<div
			class="my-1 grid origin-left scale-75 transform grid-cols-5 gap-x-2"
		>
			<Letterbox char="S" />
			<Letterbox char="H" state="present" />
			<Letterbox char="E" />
			<Letterbox char="E" />
			<Letterbox char="T" />
		</div>
		<p class="mt-1 mb-3 text-sm">
			{$t('instructions.examples.line2', { letter: 'H' })}
		</p>
		<div
			class="my-1 grid origin-left scale-75 transform grid-cols-5 gap-x-2"
		>
			<Letterbox char="S" />
			<Letterbox char="H" />
			<Letterbox char="O" />
			<Letterbox char="R" state="absent" />
			<Letterbox char="E" />
		</div>
		<p class="mt-1 mb-3 text-sm">
			{$t('instructions.examples.line3', { letter: 'R' })}
		</p>
	</div>
</Modal>
