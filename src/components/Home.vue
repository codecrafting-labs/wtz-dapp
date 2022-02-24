<template>
  <div>
    <dex-mobile-swipe
      :dex="dexTab"
      :handleClick="handleTabClick"
    ></dex-mobile-swipe>
    <div class="row">
      <div v-if="dexTab !== 'dex'" class="col-lg-6">
        <h1>
          Meet WTZ, a new FA2 token fully collateralized by XTZ, fully fungible,
          and oh so rewarding.
        </h1>

        <div style="margin-top: 32px"></div>
        <p class="text subtle-color">
          WTZ is fully fungible. Unlike other collateralized/wrapped XTZ, a user
          does not have a personal oven or vault. Anyone who holds WTZ can swap
          it back to XTZ at the current swap ratio. There is no slippage or loss
          of funds as there might be with trading through a DEX or AMM.
        </p>
        <p style="margin-top: 32px" class="text subtle-color">
          There is now an FA2 compatible version of XTZ, ready for use in dapps
          and protocols across the ecosystem.
        </p>

        <div style="margin-top: 46px">
          <div class="flex-row">
            <button style="margin-right: 24px" class="button">
              Learn More
            </button>
            <button class="button btn-outline">Learn More</button>
          </div>
        </div>
      </div>
      <div class="col-lg-6 lg-dex">
        <div class="row justify-content-center justify-content-lg-end">
          <div class="col-md-10">
            <dex></dex>
          </div>
        </div>
      </div>
      <div v-if="dexTab === 'dex'" class="col-lg-6">
        <div class="row justify-content-center justify-content-lg-end">
          <div class="col-md-10">
            <dex></dex>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dex from "./Dex.vue";
import DexMobileSwipe from "./DexMobileSwipe.vue";
export default {
  components: { Dex, DexMobileSwipe },
  name: "HomePage",
  data() {
    return {
      dexTab: "",
    };
  },
  created() {
    window.addEventListener("resize", (e) => {
      if (e.target.innerWidth > 992) {
        this.dexTab = "";
      }
    });
  },
  methods: {
    handleTabClick() {
      this.dexTab = this.dexTab !== "dex" ? "dex" : "home";
    },
  },
};
</script>

<style scoped>
p.text.subtle-color {
  font-size: 20px;
  line-height: 25px;
}

@media (max-width: 992px) {
  .lg-dex {
    display: none;
  }
}

@media (min-width: 992px) {
  .mb-dex {
    display: none;
  }
}
</style>