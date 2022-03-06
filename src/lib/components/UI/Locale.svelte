<script>
	import { i18n } from '../../i18n/i18n.store';
	$: ({ currentLocale } = i18n);
</script>

<div
	class="group flex w-full flex-row items-center justify-between border-b border-b-zinc-700 py-5 text-lg font-bold"
>
	<slot />
	<div class="flex flex-row divide-x text-base">
		<button
			class="px-2 {$currentLocale === 'en'
				? 'text-amber-500'
				: 'text-inherit'}"
			on:click={currentLocale.set('en')}>EN</button
		>
		<button
			class="px-2 {$currentLocale === 'de'
				? 'text-amber-500'
				: 'text-inherit'}"
			on:click={currentLocale.set('de')}>DE</button
		>
	</div>
</div>
