<template>
  <div class="game">
    <div class="game__container">
      <h1>
        {{ gameStore.target }}
      </h1>
      <div class="game__container--grid">
        <GameCell
          v-for="(val, x) in gameStore.options"
          :key="x"
          :value="val"
          :is-active="selections.primary === x || selections.secondary === x"
          @click="handleSelection(x, $event)"
        />
      </div>
      <GameControls
        :active-operation="selections.operation"
        @handle-operation="handleOperation"
      />
      <div class="game__container--explanation">
        <strong>How to play:</strong> Combine any of the numbers using addition, subtraction, multiplication, and division to get the target number ({{ gameStore.target }}).
      </div>
      <div class="game__container--button">
        <button @click="playAgain">
          Reset
        </button>
      </div>
    </div>
    <UIModal :open="victoryModal">
      <GameVictoryDetails
        :history="gameStore.history"
        :target="gameStore.target"
        @play-again="playAgain"
      />
    </UIModal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gameStore: gameStore(),
      victoryModal: false,
      selections: {
        primary: null,
        operation: null,
        secondary: null
      }
    };
  },
  computed: {
    primary() {
      if (this.selections.primary !== null) {
        return this.gameStore.options[this.selections.primary];
      }
      return null;
    },
    secondary() {
      if (this.selections.secondary !== null) {
        return this.gameStore.options[this.selections.secondary];
      }
      return null;
    }
  },
  mounted() {
    if (!this.gameStore.inProgress) {
      this.start();
    }
  },
  methods: {
    start() {
      this.gameStore.generateGame();
    },
    handleOperation(operator) {
      if (operator === 'reset' && this.gameStore.history.length) {
        const last = this.gameStore.history.pop();
        this.gameStore.options[last.primary.index] = last.primary.value;
        this.gameStore.options[last.secondary.index] = last.secondary.value;
        return;
      }
      if (this.selections.primary === null) {
        return;
      }
      if (this.selections.operation === operator) {
        this.selections.operation = null;
        this.selections.secondary = null;
      } else {
        this.selections.operation = operator;
      }
    },
    handleSelection(index, e) {
      if (this.selections.operation !== null) {
        if (this.selections.secondary === index || index === this.selections.primary) {
          this.selections.secondary = null;
        } else {
          this.selections.secondary = index;
        }
      } else {
        if (this.selections.primary === index) {
          this.selections.primary = null;
        } else {
          this.selections.primary = index;
        }
      }
      if (this.selections.secondary !== null) {
        this.calculate(e.target);
      }

    },
    calculate(el) {
      switch (this.selections.operation) {
        case '+':
          this.updateValue(this.primary + this.secondary);
          break;
        case '-':
          if ((this.primary - this.secondary) < 0) {
            this.handleInvalidOperation(el);
          } else {
            this.updateValue(this.primary - this.secondary);
          }
          break;
        case '/':
        if (this.primary % this.secondary !== 0) {
            this.handleInvalidOperation(el);
          } else {
            this.updateValue(this.primary / this.secondary);
          }
          break;
        case '*':
          this.updateValue(this.primary * this.secondary);
          break;
      }
    },
    updateValue(newVal) {
      // add to history
      this.gameStore.history.push({
        primary: {
          index: this.selections.primary,
          value: this.primary
        },
        secondary: {
          index: this.selections.secondary,
          value: this.secondary
        },
        operation: this.selections.operation,
        result: newVal
      });
      this.gameStore.options[this.selections.secondary] = newVal;
      this.gameStore.options[this.selections.primary] = null;
      // reset
      this.selections.primary = null;
      this.selections.operation = null;
      this.selections.secondary = null;

      if (newVal === this.gameStore.target) {
        this.handleVictory();
      }
    },
    handleInvalidOperation(el) {
      el.classList.add('shake');
      el.addEventListener('animationend', () => {
        el.classList.remove('shake');
      });
      this.selections.secondary = null;
      this.selections.operation = null;
    },
    handleVictory() {
      this.gameStore.inProgress = false;
      this.victoryModal = true;
    },
    playAgain() {
      this.victoryModal = false;
      this.start();
    }
  }
};
</script>

<style lang="scss">
.game {
  display: flex;
  flex-direction: row;
  gap: var(--base-large-gap);

  > div {
    display: flex;
    flex: 1;
    width: 100%;
  }

  &__container {
    display: flex;
    flex-direction: column;
    gap: var(--base-large-gap);
  
    h1 {
      text-align: center;
      font-size: 8rem;
    }

    &--grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--base-gap);
      justify-items: center;
      // height: calc(calc(var(--cell-height) * 2) + var(--base-gap));

      > button {
        height: var(--cell-height);
      }
    }

    &--explanation {
      text-align: center;
      font-size: 1.5rem;
      font-weight: 300;
    }

    &--button {
      display: flex;
      flex-grow: 1;
      justify-items: flex-end;

      button {
        display: flex;
        flex-grow: 1;
        justify-content: center;
        background-color: var(--nc-button);
        color: #fff;
        padding: 1rem;
        margin-top: var(--base-large-gap);

        @include breakpoint(medium) {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
