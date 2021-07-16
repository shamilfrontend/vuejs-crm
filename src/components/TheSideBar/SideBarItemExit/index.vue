<template>
  <div class="sidebar-item">
    <button
      class="sidebar-item__btn"
      aria-label="Выход"
      :title="isCollapsed ? 'Выход' : null"
      @click="handleClick"
    >
      <div class="sidebar-item__icon q-icon-logout" />
      <div
        class="sidebar-item__label"
        :class="labelClasses"
      >
        <div class="sidebar-item__title">Выход</div>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: 'SideBarItemExit',

  props: {
    isCollapsed: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    labelClasses() {
      return {
        'sidebar-item__label_hide': this.isCollapsed,
      };
    },
  },

  methods: {
    // ...mapActions('profile', ['logout']),

    handleClick() {
      // this.logout();
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar-item {
  width: 100%;
  min-height: 48px;
  overflow: hidden;

  & + & {
    margin-top: 8px;
  }

  &__btn {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 8px 36px;
    text-align: left;
    color: rgba(var(--color-rgb-white), 0.56);
    text-decoration: none;
    background-color: transparent;
    border: none;
    cursor: pointer;

    &:focus,
    &:hover {
      color: var(--color-tertiary-white);
      background-image: linear-gradient(
        101.54deg,
        var(--color-primary) 0.76%,
        var(--color-primary-purple) 100%
      );
    }
  }

  &__icon {
    width: 32px;
    font-size: 32px;
  }

  &__label {
    width: calc(100% - 48px);
    margin-left: 16px;
    opacity: 1;
    transition: opacity 0.25s ease 0.1s;

    &_hide {
      opacity: 0;
      transition: opacity 0.25s ease;
    }
  }

  &__title {
    font-weight: var(--font-weight-bold);
    font-size: 12px;
    line-height: 15px;
    text-transform: uppercase;
    white-space: nowrap;
  }

  &__subtitle {
    overflow: hidden;
    font-weight: var(--font-weight-base);
    font-size: 10px;
    line-height: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
