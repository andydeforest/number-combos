<template>
  <div class="game-victory-details">
    <h2>
      You Won!
    </h2>
    <div>
      <strong>
        Your Solution:
      </strong>
      <div class="game-victory-details__history">
        <div
          v-for="(turn, x) in history"
          :key="x"
        >
          {{ `${turn.primary.value} ${turn.operation} ${turn.secondary.value} = ${turn.result}` }}
        </div>
      </div>
    </div>
    <button @click="$emit('playAgain')">
      Play Again
    </button>
  </div>
</template>

<script>
export default {
  props: {
    history: Array,
    target: [String, Number]
  },
  emits: ['playAgain']
};
</script>

<style lang="scss">
.game-victory-details {
  display: flex;
  flex-direction: column;
  gap: var(--base-gap);

  &__history {
    > div {
      &:not(:last-of-type) {
        border-bottom: 1px solid rgba(0, 0, 0, 15%);
      }

      &:last-of-type {
        font-weight: bold;
      }
    }
  }

  button {
    background-color: var(--nc-button);
    color: #fff;
    padding: 0.5rem;
  }
}
</style>
