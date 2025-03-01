<script lang="ts">
	import { shufflePairsArray, type Pair } from '$lib';
	import ChoiceCard from '$lib/components/ChoiceCard.svelte';
	import HearTestCard from '$lib/components/HearTestCard.svelte';
	import '../app.css';

	import type { PageData } from './$types';

	const { data }: PageData = $props();

	let count = $state(0);
	let correctCount = $state(0);
	let currentIndex = $state(0);
	let shuffledItems = $state<Pair[]>(shufflePairsArray(data.entries));
	let answerRevealed = $state(false);
	let selectedAnswer = $state<1 | 2>(1);

	const checkAnswer = (answer: 1 | 2) => {
		selectedAnswer = answer;
		answerRevealed = true;
	};

	const next = () => {
		answerRevealed = false;

		count++;

		if (selectedAnswer === shuffledItems[currentIndex].answerIndex) {
			correctCount++;
		}

		// if can move to next
		if (currentIndex < shuffledItems.length - 1) {
			currentIndex += 1;
			return;
		}

		currentIndex = 0;
		shuffledItems = shufflePairsArray(data.entries);
	};

	let currentCard = $derived(shuffledItems[currentIndex]);
</script>

<main class="flex h-screen w-full flex-col items-center justify-center">
	<div class="card bg-base-200 min-w-lg shadow">
		<div class="card-body">
			<h2 class="card-title">
				{#if currentCard.question}
					{currentCard.question}
				{:else}
					{data.defaultQuestion ?? 'Which do you hear?'}
				{/if}
			</h2>

			{#key count}
				{#if 'choice' in currentCard}
					<ChoiceCard {answerRevealed} {currentCard} {selectedAnswer} {checkAnswer} />
				{:else if 'hearTest' in currentCard}
					<HearTestCard
						{answerRevealed}
						{currentCard}
						{checkAnswer}
						{selectedAnswer}
						confirmText={data.confirmText ?? 'Confirm'}
					/>
				{:else}
					<div class="alert alert-error flex flex-col items-start">
						<div>Unknown test type</div>

						<pre><code>{JSON.stringify(currentCard, null, '    ')}</code></pre>
					</div>
				{/if}
			{/key}

			<div class="card-actions justify-end">
				<button class="btn btn-primary" onclick={next} disabled={!answerRevealed}>
					{data.nextText ?? 'Next'}
				</button>
			</div>
		</div>
	</div>

	{#if count > 0}
		<small class="mt-4">
			{correctCount} / {count}
		</small>
	{/if}
</main>
