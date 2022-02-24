<template>
  <div>
    <button @click="disconnectWallet" v-if="wallet.pkh" class="button">
      {{ strFomating(wallet.pkh) }}
    </button>
    <button @click="connectWallet" v-if="!wallet.pkh" class="button">
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
    strFomating(str = "") {
      return str.substring(0, 4) + "..." + str.substring(str.length - 4);
    },
  },
};
</script>

<style scoped>
</style>