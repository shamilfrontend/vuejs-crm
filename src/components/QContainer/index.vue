<template>
  <div class="q-container">
    <div
      v-if="isTable"
      class="q-container__table-inner"
    >
      <slot />
    </div>
    <div
      v-else
      class="q-container__inner"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'QContainer',

  props: {
    isTable: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.q-container {
  width: 100%;
  max-width: 1920px;
  margin-right: auto;
  margin-left: auto;

  &__table-inner /deep/ {
    .q-table__wrapper {
      padding-left: 34px;
    }

    .q-table__table {
      padding-right: 34px;
    }

    .q-scrollbar__view {
      padding-bottom: 8px;
    }
  }

  &__inner {
    padding-right: 32px;
    padding-left: 32px;
  }
}
</style>
