import BigNumber from "bignumber.js";
import actions from "./actions";
import mutations from "./mutations";

export default {
  state: {
    connected: false,
    network: process.env.VUE_APP_TEZOS_NETWORK,
    pkh: "",
    pkhDomain: "",
    balance: new BigNumber(0),
    updateBalanceInt: null,
  },
  actions,
  mutations,
  getters: {
    getPkh(state) {
      return state.pkh;
    },
  },
};
