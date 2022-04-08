import { requestPermissions, getActiveAccount, clearActiveAccount, wallet, Tezos } from "@/utils/tezos";
import { BigNumber } from "bignumber.js";
import tzdomains from "@/utils/tezos-domains";

const setWallet = async ({ commit, dispatch }, account) => {
  const walletDisplay = `${account.address.substr(0, 6)}...${account.address.substr(-6)}`;

  commit("updateWallet", {
    connected: true,
    pkh: account.address,
    pkhDomain: walletDisplay,
    updateBalanceInt: null,
  });

  tzdomains.resolveAddressToName(account.address, walletDisplay).then((res) => {
    commit("updateWallet", {
      connected: true,
      pkh: account.address,
      pkhDomain: res,
      updateBalanceInt: setInterval(() => dispatch("updateWalletBalance"), 30 * 1000),
    });
  });

  dispatch("updateWalletBalance");
  dispatch("walletConnected");
};

export default {
  async connectWallet({ commit, state, dispatch }) {
    if (!state.connected) {
      return getActiveAccount().then((account) => {
        if (account) {
          setWallet({ commit, dispatch }, account);
        }
      });
    }
  },

  async disconnectWallet({ commit, state, dispatch }) {
    clearActiveAccount().then(() => {
      clearInterval(state.updateBalanceInt);
      commit("updateWallet", {
        connected: false,
        pkh: "",
        pkhDomain: "",
        updateBalanceInt: null,
      });
      dispatch("updateWalletBalance");
    });
  },

  async updateWalletBalance({ commit, state }) {
    if (state.connected) {
      commit("updateWalletBalance", await Tezos.tz.getBalance(state.pkh));
    } else {
      commit("updateWalletBalance", new BigNumber(0));
    }
  },

  async checkWalletConnected({ commit, dispatch }) {
    wallet.client.getActiveAccount().then((account) => {
      if (account) {
        setWallet({ commit, dispatch }, account);
      }
    });
  },

  async changeWallet({ dispatch }) {
    requestPermissions().then(() => {
      dispatch("checkWalletConnected");
    });
  },
};
