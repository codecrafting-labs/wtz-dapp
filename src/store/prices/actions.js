import coingecko from "@/utils/coingecko";

export default {
  async getCurrentPrices({ commit }) {
    try {
      const xtz = await coingecko.getXtzUsdPrice();
      commit("updatePrices", {
        xtz,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
