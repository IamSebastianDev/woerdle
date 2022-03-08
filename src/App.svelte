<script>
	import Toast from './lib/components/UI/Toast.svelte';
	import Navigation from './lib/components/Navigation/Navigation.svelte';
	import Wordle from './lib/components/GamePieces/Wordle.svelte';
	import Keyboard from './lib/components/GamePieces/Keyboard.svelte';
	import MoController from './lib/components/Modals/Controller.svelte';
</script>

<Navigation />

<MoController />
<main class="flex h-screen flex-col justify-center">
	<Toast />
	<Wordle />
	<Keyboard />
</main>
