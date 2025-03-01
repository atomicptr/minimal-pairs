<script lang="ts">
	import type { HearTestPair } from '$lib';

	interface Props {
		currentCard: HearTestPair;
		answerRevealed: boolean;
		checkAnswer: (answer: 1 | 2) => void;
		selectedAnswer: 1 | 2;
		confirmText?: string;
	}

	const { currentCard, answerRevealed, checkAnswer, selectedAnswer, confirmText }: Props = $props();

	let selected = $state<1 | 2 | null>(null);

	let audioElem = $state<HTMLAudioElement | null>(null);

	const play = (elem: 1 | 2) => {
		selected = elem;
		const url = currentCard.hearTest.audioUrls[elem - 1];

		if (!audioElem) {
			return;
		}

		audioElem.src = url;
		audioElem.play();
	};
</script>

<div class="my-4">
	<div class="mb-4 text-center text-lg">
		{currentCard.hearTest.text}
	</div>

	<audio bind:this={audioElem}></audio>

	<div class="flex flex-row gap-2">
		<button
			class="btn grow"
			class:btn-outline={selected !== 1}
			class:btn-primary={!answerRevealed}
			class:btn-success={answerRevealed && currentCard.answerIndex === 1}
			class:btn-error={answerRevealed && currentCard.answerIndex !== 1}
			disabled={answerRevealed && selectedAnswer !== 1}
			onclick={() => play(1)}
		>
			<!-- svelte-ignore a11y_consider_explicit_label -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
				/>
			</svg>
		</button>

		<button
			class="btn grow"
			class:btn-outline={selected !== 2}
			class:btn-primary={!answerRevealed}
			class:btn-success={answerRevealed && currentCard.answerIndex === 2}
			class:btn-error={answerRevealed && currentCard.answerIndex !== 2}
			disabled={answerRevealed && selectedAnswer !== 2}
			onclick={() => play(2)}
		>
			<!-- svelte-ignore a11y_consider_explicit_label -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
				/>
			</svg>
		</button>
	</div>

	<div class="mt-4 flex">
		<button
			class="btn grow"
			class:btn-primary={!answerRevealed}
			class:btn-success={answerRevealed && currentCard.answerIndex === selected}
			class:btn-error={answerRevealed && currentCard.answerIndex !== selected}
			disabled={selected === null}
			onclick={() => checkAnswer(selected as 1 | 2)}
		>
			{confirmText}
		</button>
	</div>
</div>
