import { BigNumber } from "bignumber.js";
import actions from "./actions";
import mutations from "./mutations";

export default {
  state: {
    loading: false,
    contractSwap: process.env.VUE_APP_CONTRACT_WTZ_SWAP,
    contractWtz: process.env.VUE_APP_CONTRACT_WTZ_FA2,
    balance: 0,
    totalTvlTez: 0,
    swapRatio: new BigNumber(1),
    swapRatioPrecision: new BigNumber(10).pow(18),
  },
  actions,
  mutations,
};
