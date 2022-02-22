<script>
	import Navigation from './lib/layouts/Navigation.svelte';
	import Aside from './lib/components/Navigation/Aside.svelte';
	import Wordle from './lib/layouts/Wordle.svelte';

	import Settings from './lib/components/Modals/Settings.svelte';
	import Instructions from './lib/components/Modals/Instructions.svelte';
</script>

<Navigation />
<Aside />
<div id="modals">
	<Settings />
	<Instructions />
</div>
<main>
	<Wordle />
</main>
