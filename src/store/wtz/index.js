import { BigNumber } from "bignumber.js";
import actions from "./actions";
import mutations from "./mutations";

export default {
  state: {
    loading: false,
    contractSwap: "KT1Pyd1r9F4nMaHy8pPZxPSq6VCn9hVbVrf4",
    contractWtz: "KT1PnUZCp3u2KzWr93pn4DD7HAJnm3rWVrgn",
    balance: 0,
    totalTvlTez: 0,
    swapRatio: new BigNumber(1),
    swapRatioPrecision: new BigNumber(10).pow(18),
  },
  actions,
  mutations,
};
