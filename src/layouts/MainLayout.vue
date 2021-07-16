<template>
  <div class="base-layout">
    <div class="base-layout__aside">
      <the-side-bar/>
    </div>

    <div class="base-layout__content">
      <div class="base-layout__inner">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import TheSideBar from '@/components/TheSideBar';
import messages from '@/config/messages';

export default {
  name: 'MainLayout',

  components: {
    TheSideBar,
  },

  computed: {
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
  },
};
</script>

<style lang="scss" scoped>
.base-layout {
  display: grid;
  min-width: 1280px;
  min-height: 100vh;
  grid-template-columns: auto 1fr;

  &__aside {
    position: sticky;
    top: 0;
    z-index: 1;
    height: 100%;
    max-height: 100vh;
  }

  &__content,
  &__inner {
    height: 100%;
  }

  &__content {
    width: 100%;
    min-width: 100%;
    padding: 32px 32px 48px;
  }
}
</style>
