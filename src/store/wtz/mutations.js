export default {
  updateWtzLoading(state, isLoading) {
    state.loading = isLoading;
  },

  updateWtzTotalTvlTez(state, total) {
    state.totalTvlTez = total;
  },

  updateWtzBalance(state, balance) {
    state.balance = balance;
  },

  updateWtzSwapRatio(state, swapRatio) {
    state.swapRatio = swapRatio;
  },
};
