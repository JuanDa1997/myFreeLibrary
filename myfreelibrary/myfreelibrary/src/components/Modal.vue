<script setup>
defineProps({
  img: {
    required: true,
  },
});
</script>
<template>
  <!-- container -->
  <div v-if="show === true" class="container-fluid">
    <!-- modal -->
    <div class="row">
      <div class="col-md-12">
        <div class="card" style="width: 18rem">
          <img :src="img[0]" class="card-img-top" alt="imgBooks" />
          <div class="card-body" style="padding: 10px">
            <a
              @click="activateMOdal()"
              class="btn btn-primary"
              style="padding: 10px"
              >Return</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableComponent",

  //seteo mis variables globales para usar en el html
  data() {
    return {
      show: true,
    };
  },

  methods: {
    activateMOdal() {
      if (this.$props.img[1] == true) this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/modal.scss";
</style>
