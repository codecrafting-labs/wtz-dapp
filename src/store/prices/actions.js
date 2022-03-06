import coingecko from "@/utils/coingecko";
import axios from "axios";

export default {
  async getCurrentPrices({ commit }) {
    try {
      const xtz = await coingecko.getXtzUsdPrice();
      const {
        data: { currentPrice: wtzTez },
      } = await axios.get("https://api.teztools.io/v1/KT1PnUZCp3u2KzWr93pn4DD7HAJnm3rWVrgn_0/price");

      const wtz = wtzTez * xtz;
      console.log("Hello", xtz, wtz);

      commit("updatePrices", {
        xtz,
        wtz,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
