<template>
  <div class="dex-input">
    <div class="d-flex justify-content-between">
      <small class="subtle-color">{{ name }}</small>

      <small class="subtle-color">$3.25</small>
    </div>

    <div class="d-flex align-items-center" style="margin-top: 8px">
      <div style="position: relative" class="d-flex align-items-center">
        <img class="icon" :src="icon" alt="" />
        <p>
          {{ symbol }}
        </p>
        <div
          class="dropdown d-flex align-items-start"
          :class="dropdown && 'active'"
        >
          <button
            @click="toggleDrop"
            v-if="dropdownItems?.length > 0"
            class="drop-btn"
          >
            <svg
              width="10"
              height="9"
              viewBox="0 0 10 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.90409 8.36549L2.03786 5.13447L0.169933 1.90259C0.0585734 1.70971 -3.5656e-05 1.49091 1.62741e-08 1.26819C3.56886e-05 1.04547 0.0587148 0.82669 0.170136 0.633846C0.281557 0.441001 0.441792 0.280895 0.634726 0.169628C0.82766 0.0583612 1.04649 -0.000142587 1.26921 2.60965e-07H8.7316C9.068 2.60965e-07 9.39062 0.133634 9.62849 0.371505C9.86636 0.609375 10 0.931996 10 1.2684C10.0005 1.49021 9.94216 1.70818 9.83088 1.90006L7.96634 5.13447L6.10095 8.36549C5.98962 8.5583 5.8295 8.7184 5.63669 8.82972C5.44388 8.94103 5.22516 8.99963 5.00252 8.99963C4.77988 8.99963 4.56116 8.94103 4.36835 8.82972C4.17554 8.7184 4.01542 8.5583 3.90409 8.36549Z"
                fill="#CDCDCD"
              />
            </svg>
          </button>
        </div>
        <div
          v-if="dropdown"
          style="position: absolute; top: 80%; left: 50%; z-index: 60000000"
        >
          <div
            style="
            padding: 8px 0px;
              max-height: 280px;
              min-width: 130px
              overflow-y: auto;
              background: #fff;
              border-radius: 8px;
              border: 1px solid rgba(25, 27, 31, 0.1);
            "
          >
            <div v-for="(item, index) in dropdownItems" :key="index">
              <div @click="handleItemClick(item)">
                <div
                  class="d-flex align-items-center dropdown-item"
                >
                  <img class="icon" :src="item.icon" alt="" />
                  <p style="color: #121212">
                    {{ item.symbol }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="dropdown">
          <div class="drop-backdrop" @click="toggleDrop"></div>
        </div>
      </div>
      <div style="flex: 1">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DexDropdown",
  props: ["icon", "name", "symbol", "dropdownItems", "onChange"],
  data() {
    return {
      dropdown: false,
    };
  },
  methods: {
    toggleDrop() {
      this.dropdown = !this.dropdown;
    },
    handleItemClick(item) {
      this.onChange(item);
      this.toggleDrop();
    },
  },
};
</script>

<style scoped>
.dex-input {
  background: #121212;
  border-radius: 20px;
  padding: 8px 24px 13px 14px;
}

img.icon {
  width: 24px;
}

p {
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.02em;
  color: #ffffff;
  margin: 0 8px;
}

.dropdown {
  transition: 0.4s ease all;
}
.dropdown.active {
  animation: rotate 0.5s ease 1 forwards;
}

.drop-btn {
  border: 0;
  background: transparent;
  padding: 3px;
}
.dropdown-item{
  padding: 5px 10px;
  cursor: pointer;

}
.dropdown-item:hover {
  background: #12121270;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-180deg);
  }
}
</style>
