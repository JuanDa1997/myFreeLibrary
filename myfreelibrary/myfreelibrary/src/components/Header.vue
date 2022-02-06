<script setup>
defineProps({
  msg: {
    type: String,
  },
});
</script>

<template>
  <!-- nav-var or header content -->
  <div class="el container-fluid">
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#" style="margin: 10px">
          <img
            src="https://cdn-icons.flaticon.com/png/512/1722/premium/1722398.png?token=exp=1644082900~hmac=f546f01befdf1eaf4a5fbb173c1398bd"
            alt=""
            width="45"
            height="45"
          />
          My Free Library
        </a>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/header.scss";
</style>
