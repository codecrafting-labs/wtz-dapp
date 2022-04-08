<template>
  <div>
    <button @click="disconnectWallet" v-if="wallet.connected" class="button">
      {{ wallet.pkhDomain }}
    </button>
    <button @click="connectWallet" v-if="!wallet.connected" class="button">
      Connect Wallet
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "WalletConnect",
  computed: {
    ...mapState(["wallet"]),
  },
  methods: {
    ...mapActions(["connectWallet", "disconnectWallet"]),
  },
};
</script>

<style scoped>
</style>