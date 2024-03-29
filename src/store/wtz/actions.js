import tzkt from "@/utils/tzkt";
import { getWalletContract, getContract } from "@/utils/tezos";
import { BigNumber } from "bignumber.js";

export default {

  async getSwapRatio({ state }) {
    const swapK = await getContract(state.contractProxy);
    return swapK.contractViews.getSwapRatio().executeView({ viewCaller: state.contractProxy });
  },

  async loadWtzData({ state, commit, dispatch }) {
    if (!state.loading) {
      commit("updateWtzLoading", true);

      const swapRatio = await dispatch("getSwapRatio");
      commit("updateWtzSwapRatio", swapRatio);

      const wtzBalance = await dispatch("getWtzBalance");
      commit("updateWtzBalance", wtzBalance);

      commit("updateWtzLoading", false);
    }
  },

  async getWtzBalance({ state, rootState }) {
    if (!rootState.wallet.connected) {
      return 0;
    }

    return tzkt
      .getContractBigMapKeys(state.contractWtz, "ledger", {
        "key.address": rootState.wallet.pkh,
        active: "true",
      })
      .then((tokenLedger) => {
        let tokenBal = BigNumber(0);
        if (tokenLedger.data.length) {
          tokenBal = BigNumber(tokenLedger.data[0].value).div(
            BigNumber(10).pow(6)
          );
        }
        return tokenBal.toNumber();
      });
  },

  async updateWalletBalance({ commit, dispatch }) {
    const wtzBalance = await dispatch("getWtzBalance");
    commit("updateWtzBalance", wtzBalance);
  },

  async wtzWrap({ state, rootState, commit, dispatch }, amountToWrap) {
    commit("updateWtzLoading", true);

    const wtzSwap = await getWalletContract(state.contractProxy);
    const amount = BigNumber(amountToWrap)
      .times(BigNumber(10).pow(6))
      .idiv(1)
      .toNumber();

    try {
      await dispatch("connectWallet");

      const tx = await wtzSwap.methods
        .wrap(rootState.wallet.pkh)
        .send({ amount: amount, mutez: true });

      tx.confirmation().finally(() => {
        commit("updateWtzLoading", false);
        dispatch("loadWtzData");
      });
    } catch (e) {
      commit("updateWtzLoading", false);
      console.log(e);
    }
  },

  async wtzUnwrap({ state, rootState, commit, dispatch }, amountToUnwrap) {
    commit("updateWtzLoading", true);

    const wtzSwap = await getWalletContract(state.contractProxy);
    const amount = BigNumber(amountToUnwrap)
      .times(BigNumber(10).pow(6))
      .idiv(1)
      .toNumber();

    try {
      await dispatch("connectWallet");

      const tx = await wtzSwap.methods
        .unwrap(amount, rootState.wallet.pkh)
        .send();

      tx.confirmation().finally(() => {
        commit("updateWtzLoading", false);
        dispatch("loadWtzData");
      });
    } catch (e) {
      commit("updateWtzLoading", false);
      console.log(e);
    }
  },
};
