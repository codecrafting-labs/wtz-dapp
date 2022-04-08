<template>
  <div>
    <div id="dex">
      <div v-if="wtz.loading" class="loader">
        <img width="100" src="../assets/ripple.svg" alt="" />
      </div>
      <h2 style="margin-bottom: 16px">
        <template v-if="action === 'Wrap'">Mint WTZ</template>
        <template v-else>Redeem XTZ</template>
      </h2>
      <form @submit="submitAction">
        <div>
          <small style="padding-left: 30px" class="subtle-color">
            You Swap
          </small>
          <div style="padding-top: 5px">
            <dex-dropdown
              :valueUsd="
                getValueUsd(inputValue, action === 'Wrap' ? 'xtz' : 'wtz')
              "
              :symbol="input.symbol"
              :icon="input.icon"
              :name="input.name"
            >
              <input
                @keypress="isNumber($event)"
                v-model="inputValue"
                required
                @input="calculateOutput(inputValue)"
                placeholder="VALUE"
                class="input-elem"
              />
            </dex-dropdown>
            <div class="d-flex justify-content-between">
              <div>
                <small v-if="action === 'Wrap'" style="padding-left: 30px"
                  >Balance:
                  <span class="subtle-color"
                    >{{
                      vueNumberFormat(wallet.balance.toNumber() / 1000000)
                    }}
                    ꜩ</span
                  >
                </small>
                <small v-if="action === 'Unwrap'" style="padding-left: 30px"
                  >Balance:
                  <span class="subtle-color"
                    >{{ vueNumberFormat(wtz.balance) }} WTZ</span
                  >
                </small>
              </div>
              <div v-if="error" class="col d-flex justify-content-end">
                <small
                  style="text-align: center; color: #f64947; margin-top: 3px"
                >
                  {{ error }}
                </small>
              </div>
            </div>
          </div>
        </div>

        <div style="margin: 8px" class="d-flex justify-content-center">
          <button
            type="button"
            @click="handleSwitch"
            class="switch-input-output"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.08635 14.3911L5.08635 3.32283L8.34745 6.58426C8.53951 6.77665 8.85141 6.77665 9.0438 6.58426C9.13999 6.48807 9.18792 6.36199 9.18792 6.23592C9.18792 6.10985 9.13999 5.98378 9.0438 5.88759L4.94255 1.78601C4.91989 1.76336 4.89461 1.74267 4.86769 1.72461C4.86112 1.72002 4.8539 1.71772 4.84734 1.71378C4.82665 1.70098 4.80564 1.68883 4.78299 1.67931C4.77314 1.67537 4.7623 1.6734 4.75245 1.67011C4.7321 1.66322 4.7124 1.65567 4.69106 1.6514C4.65921 1.6445 4.62671 1.64155 4.59388 1.64155C4.56105 1.64155 4.52822 1.64483 4.4967 1.6514C4.47536 1.65567 4.45566 1.66289 4.43531 1.67011C4.42513 1.67373 4.41462 1.6757 4.40477 1.67931C4.38212 1.68883 4.36111 1.70098 4.34042 1.71378C4.33386 1.71772 4.32664 1.72034 4.32007 1.72461C4.29315 1.74267 4.2682 1.76303 4.24521 1.78601L0.144292 5.88726C-0.0480974 6.07965 -0.0480974 6.39122 0.144292 6.5836C0.336354 6.77599 0.648577 6.77599 0.840638 6.5836L4.10141 3.32283L4.10141 14.3911C4.10141 17.4838 6.61758 20 9.71027 20C9.98243 20 10.2027 19.7794 10.2027 19.5075C10.2027 19.2357 9.98243 19.0151 9.71027 19.0151C7.16061 19.0151 5.08635 16.9408 5.08635 14.3911ZM9.68532 0.492466C9.68532 0.764307 9.90561 0.98493 10.1778 0.98493C12.7274 0.98493 14.8017 3.05919 14.8017 5.60885V16.6772L11.5406 13.4157C11.3485 13.2233 11.0366 13.2233 10.8442 13.4157C10.6519 13.6081 10.6519 13.9197 10.8442 14.1121L14.9455 18.214C14.9682 18.2366 14.9934 18.2573 15.0204 18.2754C15.0272 18.2803 15.0351 18.2829 15.042 18.2872C15.0624 18.2994 15.0827 18.3115 15.1047 18.321C15.1149 18.3253 15.1257 18.3273 15.1366 18.3305C15.1563 18.3374 15.176 18.3447 15.1967 18.3489C15.2285 18.3555 15.261 18.3588 15.2942 18.3588C15.3273 18.3588 15.3598 18.3552 15.3917 18.3489C15.4124 18.3447 15.4321 18.3374 15.4518 18.3305C15.4623 18.3269 15.4731 18.325 15.4836 18.321C15.5056 18.3118 15.526 18.2997 15.5463 18.2872C15.5532 18.2829 15.5611 18.2803 15.568 18.2754C15.5949 18.2573 15.6198 18.237 15.6428 18.214L19.7438 14.1131C19.8399 14.0169 19.8879 13.8908 19.8879 13.7647C19.8879 13.6387 19.8399 13.5126 19.7438 13.4164C19.5517 13.224 19.2395 13.224 19.0474 13.4164L15.7866 16.6772V5.60885C15.7866 2.51617 13.2705 0 10.1778 0C9.90561 0 9.68532 0.220625 9.68532 0.492466Z"
                fill="white"
              />
            </svg>
          </button>
        </div>

        <div>
          <small style="padding-left: 30px" class="subtle-color">
            You Recieve
          </small>
          <div style="padding-top: 5px">
            <dex-dropdown
              :valueUsd="
                getValueUsd(outputValue, action !== 'Wrap' ? 'xtz' : 'wtz')
              "
              :icon="output.icon"
              :symbol="output.symbol"
              :name="output.name"
            >
              <input
                disabled
                v-model="outputValue"
                placeholder="0"
                class="input-elem"
                type="number"
              />
            </dex-dropdown>
            <small v-if="action !== 'Wrap'" style="padding-left: 30px"
              >Balance:
              <span class="subtle-color"
                >{{
                  vueNumberFormat(wallet.balance.toNumber() / 1000000)
                }}
                ꜩ</span
              >
            </small>
            <small v-if="action !== 'Unwrap'" style="padding-left: 30px"
              >Balance:
              <span class="subtle-color"
                >{{ vueNumberFormat(wtz.balance) }} WTZ</span
              >
            </small>
          </div>
        </div>

        <div style="margin: 12px 0 18px; padding: 0 15px">
          <button type="submit" style="width: 100%" class="button">
            {{ action === "Wrap" ? "Mint" : "Redeem" }} {{ action !== "Wrap" ? "XTZ" : "WTZ" }}
          </button>
        </div>
        <div style="padding: 0 15px">
          <div class="row swap-details">
            <div class="col-6">
              <small class="subtle-color">
                {{ inputValue }} {{ input.symbol }}
              </small>
            </div>
            <div class="col-6">
              <small
                ><span style="font-size: 10px" class="subtle-color"
                  >~${{
                    vueNumberFormat(
                      getValueUsd(1, action === "Wrap" ? "xtz" : "wtz"),
                      { prefix: "", decimal: ".", thousand: ",", precision: 2 }
                    )
                  }}</span
                >
                1 {{ input.symbol }}</small
              >
            </div>

            <div class="col-6">
              <small class="subtle-color">
                {{ outputValue }} {{ output.symbol }}
              </small>
            </div>
            <div class="col-6">
              <small
                ><span style="font-size: 10px" class="subtle-color"
                  >~${{
                    vueNumberFormat(
                      getValueUsd(1, action !== "Wrap" ? "xtz" : "wtz"),
                      { prefix: "", decimal: ".", thousand: ",", precision: 2 }
                    )
                  }}</span
                >
                1 {{ output.symbol }}</small
              >
            </div>
            <div class="col-6">
              <small class="subtle-color"> Transaction fee </small>
            </div>
            <div class="col-6">
              <small v-if="action !== 'Wrap'">0.1%</small>
              <small v-else>0.0%</small>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import BigNumber from "bignumber.js";
import { mapActions, mapState } from "vuex";
import DexDropdown from "./DexDropdown.vue";
export default {
  components: { DexDropdown },
  name: "DexComponent",
  data() {
    return {
      error: "",
      action: "Wrap",
      input: {
        symbol: "XTZ",
        name: "Tez",
        icon: "data:image/png;base64,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",
      },
      output: {
        name: "Wrapped Tezos",
        symbol: "WTZ",
        icon: "https://ipfs.fleek.co/ipfs/bafybeidwsid6fvv4vxbqja7er3b4exsht5r7umv6hpz7rc3ujg7xilhwv4",
      },
      outputValue: null,
      inputValue: null,
    };
  },
  computed: {
    ...mapState(["wallet", "wtz", "prices"]),
  },
  created() {
    this.refresh();
    setInterval(() => {
      this.getCurrentPrices();
    }, 1000 * 60 * 2);
  },

  mounted() {
    this.getCurrentPrices();
  },

  methods: {
    ...mapActions([
      "loadWtzData",
      "wtzWrap",
      "wtzUnwrap",
      "updateWalletBalance",
      "getCurrentPrices",
    ]),

    refresh() {
      this.loadWtzData();
    },

    getValueUsd(input, base = 'xtz') {
      if (base === 'xtz') {
        return this.prices.xtz * input;
      } else {
        const inputAsXtz = BigNumber(input)
          .times(this.wtz.swapRatioPrecision)
          .div(this.wtz.swapRatio)
          .times(1 - 0.001)
          .toNumber()
          .toFixed(6);
        return this.prices.xtz * inputAsXtz;
      }
    },

    handleSwitch() {
      const tempValue = this.inputValue;
      this.inputValue = this.outputValue;
      this.outputValue = tempValue;
      if (this.action.toLowerCase() === "wrap") {
        this.action = "Unwrap";
      } else {
        this.action = "Wrap";
      }
      const temp = this.input;
      this.input = { ...this.output, value: this.input.value };
      this.output = temp;
    },

    calculateOutput(input) {
      const fee = 0.001;
      let returnVal = 0;

      if (this.action.toLowerCase() === "wrap") {
        returnVal = BigNumber(input)
          .times(this.wtz.swapRatio)
          .div(this.wtz.swapRatioPrecision)
          .toNumber()
          .toFixed(6);
      } else {
        returnVal = BigNumber(input)
          .times(this.wtz.swapRatioPrecision)
          .div(this.wtz.swapRatio)
          .times(1 - fee)
          .toNumber()
          .toFixed(6);
      }

      this.outputValue = returnVal;
    },
    isNumber(evt) {
      this.error = "";
      const keysAllowed = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        ".",
      ];
      const keyPressed = evt.key;

      if (!keysAllowed.includes(keyPressed)) {
        evt.preventDefault();
      }
    },
    async submitAction(e) {
      e.preventDefault();

      if (this.inputValue < 0.000001) {
        this.error = "Enter a valid amount (at least 0.000001)";
        return false;
      }

      if (this.action === "Wrap") {
        await this.wtzWrap(this.inputValue);
      } else {
        await this.wtzUnwrap(this.inputValue);
      }
      this.updateWalletBalance();

      this.inputValue = null;
      this.outputValue = null;
    },
  },
};
</script>

<style scoped>
#dex {
  background: #1e1e1e;
  box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  padding: 12px 9px 24px 16px;
  position: relative;
  overflow: hidden;
}

input {
  border: 0;
  text-align: right;
  background: transparent;
  font-family: "Roboto";
  font-size: 18px;
  line-height: 21px;
  letter-spacing: -0.02em;
  color: #ffffff;
  width: 100%;
  padding: 2px;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

.switch-input-output {
  border: 0;
  background: transparent;
  padding: 3px;
}

.swap-details > div:nth-child(even) {
  text-align: right;
}

.loader {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.50);
  z-index: 9000;
}
</style>