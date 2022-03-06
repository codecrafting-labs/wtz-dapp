<template>
  <div class="dex-input">
    <div class="d-flex justify-content-between">
      <small class="subtle-color">{{ name }}</small>

      <small class="subtle-color"
        >${{
          vueNumberFormat(valueUsd, {
            prefix: "",
            decimal: ".",
            thousand: ",",
            precision: 2,
          })
        }}</small
      >
    </div>

    <div class="d-flex align-items-center" style="margin-top: 8px">
      <div style="position: relative" class="d-flex align-items-center">
        <img class="icon" :src="icon" alt="" />
        <p>
          {{ symbol }}
        </p>
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
  props: ["icon", "name", "symbol", "valueUsd"],
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
.dropdown-item {
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
