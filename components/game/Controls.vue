<template>
  <div class="game-controls">
    <button @click="$emit('handleOperation', 'reset')">
      <BaseIcon icon="fa-solid fa-rotate-right" />
    </button>
    <button
      :class="[activeOperation === '+' ? 'active' : '']"
      @click="$emit('handleOperation', '+')"
    >
      <BaseIcon icon="fa-solid fa-plus" />
    </button>
    <button
      :class="[activeOperation === '-' ? 'active' : '']"
      @click="$emit('handleOperation', '-')"
    >
      <BaseIcon icon="fa-solid fa-minus" />
    </button>
    <button
      :class="[activeOperation === '*' ? 'active' : '']"
      @click="$emit('handleOperation', '*')"
    >
      <BaseIcon icon="fa-solid fa-xmark" />
    </button>
    <button
      :class="[activeOperation === '/' ? 'active' : '']"
      @click="$emit('handleOperation', '/')"
    >
      <BaseIcon icon="fa-solid fa-divide" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    activeOperation: {
      type: String,
      default: null
    }
  },
  emits: ['handleOperation']
};
</script>

<style lang="scss">
.game-controls {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;

  > button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--nc-button);
    border-radius: 50%;
    height: 5rem;
    width: 5rem;

    &.active {
      background-color: green;
    }

    svg {
      color: #fff;
    }
  }
}
</style>
