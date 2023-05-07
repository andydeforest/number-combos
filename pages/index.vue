<template>
  <BaseMain>
    <BaseSection class="game-container">
      <Game />
    </BaseSection>
  </BaseMain>
</template>

<style lang="scss">
#content {
  display: flex;
}

.game-container {
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;

  .container {
    @include breakpoint(medium) {
      width: 40rem;
    }
  }
}
</style>
