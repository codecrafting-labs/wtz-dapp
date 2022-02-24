import { clearActiveAccount, getActiveAccount, requestPermissions, wallet } from "@/util/tezos";

export default {
  async connectWallet({ commit, state }) {
    if (!state.connected) {
      return getActiveAccount().then((account) => {
        if (account) {
          commit("updateWallet", {
            connected: true,
            pkh: account.address,
          });
        }
      });
    }
  },

  async disconnectWallet({ commit, state }) {
    clearActiveAccount().then(() => {
      clearInterval(state.updateBalanceInt);
      commit("updateWallet", {
        connected: false,
        pkh: "",
      });
    });
  },

  async checkWalletConnected({ commit }) {
    wallet.client.getActiveAccount().then((account) => {
      if (account) {
        commit("updateWallet", {
          connected: true,
          pkh: account.address,
        });
      }
    });
  },

  async changeWallet({ dispatch }) {
    requestPermissions().then(() => {
      dispatch("checkWalletConnected");
    });
  },
};
