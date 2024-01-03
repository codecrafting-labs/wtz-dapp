export default {
  updateWtzLoading(state, isLoading) {
    state.loading = isLoading;
  },

  updateWtzBalance(state, balance) {
    state.balance = balance;
  },

  updateWtzSwapRatio(state, swapRatio) {
    state.swapRatio = swapRatio;
  },
};
