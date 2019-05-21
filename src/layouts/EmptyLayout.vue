<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
  import messages from '@/config/messages';

  export default {
    name: "EmptyLayout",

    computed: {
      error() {
        return this.$store.getters.error;
      }
    },

    watch: {
      error(fbError) {
        this.$error(messages[fbError.code] || 'Что то пошло не так.');
      },
    },
  }
</script>

<style scoped>

</style>
