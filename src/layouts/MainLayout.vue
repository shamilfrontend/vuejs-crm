<template>
  <div class="wrap">
    <loader v-if="loading" />
    <div
      v-else
      class="app-main-layout"
    >
      <nav-bar
        @click="isOpen = !isOpen"
      />

      <side-nav
        v-model="isOpen"
        :key="locale"
      />

      <main :class="appContentClasses">
        <div class="app-page">

          <router-view />

        </div>
      </main>

      <div
        class="fixed-action-btn"
      >
        <router-link
          class="btn-floating btn-large blue"
          to="/record"
          v-tooltip="'CreateNewRecord'"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import SideNav from '@/components/SideNav.vue';

import messages from '@/config/messages';

export default {
  name: 'MainLayout',

  components: {
    NavBar,
    SideNav,
  },

  data() {
    return {
      isOpen: true,
      loading: true,
    };
  },

  computed: {
    appContentClasses() {
      return {
        'app-content': true,
        full: !this.isOpen,
      };
    },
    error() {
      return this.$store.getters.error;
    },
    locale() {
      return this.$store.getters.info.locale;
    },
  },

  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || 'Что то пошло не так.');
    },
  },

  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo');
    }
    this.loading = false;
  },
};
</script>

<style scoped>

</style>
