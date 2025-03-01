<script lang="ts">
	import type { ChoicePair } from '$lib';

	interface Props {
		currentCard: ChoicePair;
		answerRevealed: boolean;
		selectedAnswer: 1 | 2;
		checkAnswer: (answer: 1 | 2) => void;
	}

	const { currentCard, answerRevealed, selectedAnswer, checkAnswer }: Props = $props();
</script>

<div class="my-4">
	<div class="mb-8">
		<audio autoplay controls src={currentCard.choice.audioUrl}></audio>
	</div>

	<div class="flex flex-row gap-2">
		<button
			class="btn grow"
			class:btn-primary={!answerRevealed}
			class:btn-success={answerRevealed && currentCard.answerIndex === 1}
			class:btn-error={answerRevealed && currentCard.answerIndex !== 1}
			disabled={answerRevealed && selectedAnswer !== 1}
			onclick={() => (!answerRevealed ? checkAnswer(1) : undefined)}
		>
			{currentCard.choice.choices[0]}
		</button>

		<button
			class="btn grow"
			class:btn-primary={!answerRevealed}
			class:btn-success={answerRevealed && currentCard.answerIndex === 2}
			class:btn-error={answerRevealed && currentCard.answerIndex !== 2}
			disabled={answerRevealed && selectedAnswer !== 2}
			onclick={() => (!answerRevealed ? checkAnswer(2) : undefined)}
		>
			{currentCard.choice.choices[1]}
		</button>
	</div>
</div>
