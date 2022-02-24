import { NetworkType } from "@airgap/beacon-sdk";
import actions from "./actions";
import mutations from "./mutations";

export default {
  state: {
    connected: false,
    network: NetworkType.MAINNET,
    pkh: "",
  },
  actions,
  mutations,
  getters: {
    getPkh(state) {
      return state.pkh;
    },
  },
};
