import { NetworkType } from "@airgap/beacon-sdk";
import BigNumber from "bignumber.js";
import actions from "./actions";
import mutations from "./mutations";

export default {
  state: {
    connected: false,
    network: NetworkType.MAINNET,
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
