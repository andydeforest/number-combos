<template>
  <button
    v-if="value !== null"
    class="game-cell"
    :class="[isActive ? 'active' : '']"
  >
    {{ value }}
  </button>
  <button v-else />
</template>

<script>
export default {
  props: {
    value: Number,
    isActive: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss">
.game-cell {
  display: flex;
  height: 20vw;
  width: 20vw;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 3px dashed #000;
  font-size: 4rem;

  @include breakpoint(small) {
    height: 10rem;
    width: 10rem;
  }

  &.active {
    background-color: green;
    border: 3px solid green;
    color: #fff;
  }
}
</style>
