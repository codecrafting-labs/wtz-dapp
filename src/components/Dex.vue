<template>
  <div id="dex">
    <h2 style="margin-bottom: 16px">Mint</h2>

    <small class="subtle-color"> You Swap </small>

    <div>
      <dex-dropdown></dex-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "DexComponent",
};
</script>

<style scoped>
#dex {
  background: #1e1e1e;
  box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  padding: 12px 9px 24px 16px;
}
</style>