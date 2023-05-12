<template>
  <div class="game-settings">
    <button>
      <BaseIcon
        icon="fa-solid fa-gear"
        @click="modalOpen = true"
      />
    </button>
    <UIModal :open="modalOpen">
      <div class="game-settings__modal">
        <div class="game-settings__modal--heading">
          <h2>
            Settings
          </h2>
          <div>
            <button>
              <BaseIcon
                icon="fa-solid fa-xmark"
                @click="modalOpen = false"
              />
            </button>
          </div>
        </div>
        <div class="game-settings__modal--slider">
          <input
            v-model="gameStore.maxTarget"
            type="range"
            min="100"
            max="1000"
          >
        </div>
        <div>
          <strong>Max Target Value:</strong> {{ gameStore.maxTarget }}
        </div>
        <div>
          <p>
            The max target value controls the maximum value that can be generated when starting a game. The higher the value, the more difficult (and potentially impossible) the game will be.
          </p>
        </div>
      </div>
    </UIModal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gameStore: gameStore(),
      modalOpen: false
    };
  }
};
</script>

<style lang="scss">
.game-settings {
  position: fixed;
  top: 1rem;
  left: 1rem;

  @include breakpoint(medium) {
    position: absolute;
  }

  > button {
    background-color: #000;
    color: #fff;
    height: 5rem;
    width: 5rem;
    font-size: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    @include breakpoint(medium) {
      height: 2.5rem;
      width: 2.5rem;
      font-size: 1.5rem;
    }
  }

  &__modal {
    display: flex;
    flex-direction: column;
    width: 80vw;

    &--heading {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: var(--base-gap);

      > div:last-child {
        display: flex;
        flex-grow: 1;
        justify-content: flex-end;
      }

      button {
        font-size: var(--h2-font-size);
      }
    }

    p {
      margin-top: var(--base-gap);
    }

    &--slider {
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin-top: var(--base-gap);
      
      input[type=range] {
        width: 100%;
      }
    }
  }
}
</style>