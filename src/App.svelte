<script>
	import Navigation from './lib/components/Navigation/Navigation.svelte';
	import Aside from './lib/components/Navigation/Aside.svelte';
	import Wordle from './lib/components/GamePieces/Wordle.svelte';
	import Keyboard from './lib/components/GamePieces/Keyboard.svelte';

	import Settings from './lib/components/Modals/Settings.svelte';
	import Instructions from './lib/components/Modals/Instructions.svelte';
	import Stats from './lib/components/Modals/Stats.svelte';
</script>

<Navigation />
<Aside />
<div id="modals">
	<Settings />
	<Instructions />
	<Stats />
</div>
<main>
	<Wordle />
	<Keyboard />
</main>
