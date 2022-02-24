<template>
  <div id="dex-mobile-swipe">
    <div class="swipe-container">
      <div class="wrapper">
        <button
          @click="handleClick"
          :class="dex && dex + '-tab'"
          class="d-flex align-items-center"
          style="border: 0; background: transparent; padding: 3px"
        >
          <svg
            :class="dex && dex + '-tab'"
            width="45"
            height="45"
            viewBox="0 0 45 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.25 22.5C11.25 22.9973 11.4475 23.4742 11.7992 23.8258C12.1508 24.1775 12.6277 24.375 13.125 24.375H34.8469L32.4244 26.7994C32.1015 27.1222 31.9076 27.5518 31.879 28.0075C31.8503 28.4631 31.9889 28.9136 32.2687 29.2744L32.4244 29.4506C32.7472 29.7735 33.1768 29.9674 33.6325 29.996C34.0881 30.0247 34.5386 29.8861 34.8994 29.6062L35.0756 29.4506L40.7006 23.8256C41.0235 23.5028 41.2174 23.0732 41.246 22.6175C41.2747 22.1619 41.1361 21.7114 40.8562 21.3506L40.7006 21.1744L35.0756 15.5494C34.7382 15.2131 34.2854 15.0179 33.8093 15.0033C33.3331 14.9888 32.8693 15.156 32.512 15.4711C32.1547 15.7862 31.9307 16.2254 31.8855 16.6996C31.8403 17.1739 31.9773 17.6475 32.2687 18.0244L32.4244 18.2006L34.8469 20.625H13.125C12.6277 20.625 12.1508 20.8225 11.7992 21.1742C11.4475 21.5258 11.25 22.0027 11.25 22.5ZM3.75 22.5C3.74859 24.6549 4.48959 26.7445 5.84828 28.4171C7.20697 30.0897 9.10039 31.2432 11.2099 31.6834C13.3193 32.1236 15.5161 31.8237 17.4303 30.8341C19.3446 29.8445 20.8594 28.2256 21.72 26.25H18.51C17.7116 27.3965 16.5682 28.2584 15.2461 28.7101C13.924 29.1618 12.4923 29.1797 11.1593 28.7613C9.82628 28.343 8.66159 27.5101 7.83472 26.3839C7.00785 25.2578 6.56197 23.8971 6.56197 22.5C6.56197 21.1029 7.00785 19.7422 7.83472 18.6161C8.66159 17.4899 9.82628 16.657 11.1593 16.2387C12.4923 15.8203 13.924 15.8382 15.2461 16.2899C16.5682 16.7416 17.7116 17.6035 18.51 18.75H21.72C20.858 16.7762 19.3428 15.1594 17.4291 14.1712C15.5153 13.183 13.3197 12.8837 11.2114 13.3237C9.10298 13.7637 7.21033 14.9161 5.85154 16.5872C4.49275 18.2583 3.75066 20.3462 3.75 22.5V22.5Z"
              fill="url(#paint0_linear_1_2)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1_2"
                x1="22.4999"
                y1="13.126"
                x2="22.4999"
                y2="31.8811"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#1161FE" />
                <stop offset="1" stop-color="#5343BA" />
              </linearGradient>
            </defs>
          </svg>
          <p>{{ dex === "dex" ? "Back" : "DEX" }}</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DexMobileSwipe",
  props: ["dex", "handleClick"],
};
</script>

<style scoped>
.swipe-container {
  display: block;
  border-width: 1px 0 1px 0;
  border-style: solid;
  border-image: linear-gradient(270deg, #1161fe 7.1%, #5343ba 95.16%) 1;
  padding: 20px 15px;
  padding-right: 85px;
  margin-bottom: 26px;
}
@media (min-width: 992px) {
  .swipe-container {
    display: none;
  }
}

.wrapper {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
}

svg.dex-tab {
  transform: rotate(180deg);
}

p {
  font-weight: 700;
}

.d-flex {
  flex-direction: row-reverse;
  position: absolute;
  width: 70px;
  left: 0;
}

.d-flex.dex-tab {
  flex-direction: row;
}

button.home-tab {
  animation: rightToLeft 0.6s ease 1 forwards;
}

button.dex-tab {
  animation: leftToRight 0.6s ease 1 forwards;
}

@keyframes leftToRight {
  from {
    left: 0;
  }

  to {
    left: 100%;
  }
}

@keyframes rightToLeft {
  from {
    left: 100%;
  }

  to {
    left: 0;
  }
}
</style>