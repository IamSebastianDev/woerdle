<script>
	import Modal from '../UI/Modal.svelte';
	import Letterbox from '../GamePieces/Letterbox.svelte';
	import { activeModal, closeModal } from '../../stores/modal.store';
</script>

{#if $activeModal === 1}
	<Modal on:close={closeModal} title="How to play">
		<div class="mx-auto mt-2 space-y-3 text-sm">
			<p>Guess the <strong>WORDLE</strong> in six tries.</p>
			<p>
				Each guess must be a valid five-letter word. Hit the enter
				button to submit.
			</p>
			<p>
				After each guess, the color of the tiles will change to show how
				close your guess was to the word.
			</p>
		</div>
		<hr class="my-4 border-zinc-500" />
		<div class="flex flex-col items-start">
			<p><strong>Examples</strong></p>
			<div
				class="my-1 grid origin-left scale-[0.6] transform grid-cols-5 gap-x-2"
			>
				<Letterbox char="S" state="correct" />
				<Letterbox char="P" />
				<Letterbox char="A" />
				<Letterbox char="I" />
				<Letterbox char="N" />
			</div>
			<p class="mt-1 mb-3 text-sm">
				The letter S is in the word and in the correct spot.
			</p>
			<div
				class="my-1 grid origin-left scale-[0.6] transform grid-cols-5 gap-x-2"
			>
				<Letterbox char="S" />
				<Letterbox char="H" state="present" />
				<Letterbox char="E" />
				<Letterbox char="E" />
				<Letterbox char="T" />
			</div>
			<p class="mt-1 mb-3 text-sm">
				The letter H is in the word but in the wrong spot.
			</p>
			<div
				class="my-1 grid origin-left scale-[0.6] transform grid-cols-5 gap-x-2"
			>
				<Letterbox char="S" />
				<Letterbox char="H" />
				<Letterbox char="O" />
				<Letterbox char="R" state="absent" />
				<Letterbox char="E" />
			</div>
			<p class="mt-1 mb-3 text-sm">
				The letter R is not in the word in any spot.
			</p>
		</div>
		<hr class="my-4 border-zinc-500" />
	</Modal>
{/if}
