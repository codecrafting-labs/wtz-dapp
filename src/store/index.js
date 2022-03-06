import { createStore } from "vuex";
import wallet from "./wallet";
import wtz from "./wtz";
import prices from "./prices";

export default createStore({
  modules: {
    wallet,
    wtz,
    prices,
  },
});
