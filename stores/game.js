import { defineStore, acceptHMRUpdate } from 'pinia';

export const gameStore = defineStore('game', {
  state: () => {
    return {
      maxTarget: 100,
      inProgress: false,
      options: [],
      history: [],
      target: null,

    };
  },
  actions: {
    generateGame() {
      this.inProgress = true;
      this.history = [];
      const minTarget = parseInt(parseInt(this.maxTarget) * 0.6);
      this.target = Math.floor(Math.random() * (parseInt(this.maxTarget) - minTarget + 1)) + minTarget;
      const options = [];
    
      while (options.length < 6) {
        const option = Math.floor(Math.random() * parseInt(this.target / 6)) + 1;
        if (option < this.target && !options.includes(option) && option > 1) {
          options.push(option);
        }
      }
      this.options = options;
    }
  },
  persist: true
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(gameStore, import.meta.hot));
}
