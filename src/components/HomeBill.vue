<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p class="currency-line">
          <span>{{ bill }} 12.0 Р</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeBill",

    computed: {
      bill() {
        return this.$store.getters.info.bill;
      },
    },
  }
</script>

<style scoped>

</style>
