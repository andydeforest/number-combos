<template>
  <div class="game-history">
    <div
      v-for="(operation, x) in history"
      :key="x"
    >
      {{ operation.primary.value }} {{ operation.operation }} {{ operation.secondary.value }} = {{ operation.result }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    history: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss">
.game-history {
  display: flex;
  flex-direction: column;
}
</style>