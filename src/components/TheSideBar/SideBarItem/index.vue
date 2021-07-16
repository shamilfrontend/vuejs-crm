<template>
  <div
    class="sidebar-item"
    :title="title"
  >
    <component
      :is="type"
      v-bind="componentProps"
      :aria-label="title"
      class="sidebar-item__element"
      @click="$emit('click')"
    >
      <div class="sidebar-item__icon">
        <span :class="icon" />
      </div>
      <div
        class="sidebar-item__label"
        :class="labelClasses"
      >
        <div class="sidebar-item__title">
          {{ title }}
        </div>
        <div
          v-if="subtitle"
          class="sidebar-item__subtitle"
        >
          {{ subtitle }}
        </div>
      </div>
    </component>
  </div>
</template>

<script>
export default {
  name: 'SideBarItem',

  props: {
    type: {
      type: String,
      default: 'router-link',
      validator: value => ['button', 'router-link'].includes(value),
    },
    isCollapsed: {
      type: Boolean,
      default: false,
    },
    path: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    exact: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    componentProps() {
      if (this.type === 'button') return null;

      return {
        to: {
          path: this.path,
        },
        exact: this.exact,
      };
    },

    labelClasses() {
      return {
        'sidebar-item__label_hide': this.isCollapsed,
      };
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

  &__element {
    display: flex;
    align-items: center;
    padding: 8px 36px;
    color: rgba(255, 255, 255, 0.56);
    text-decoration: none;

    &:focus,
    &:hover,
    &.router-link-active,
    &.router-link-exact-active {
      color: #fff;
      background-image: linear-gradient(
          101.54deg,
          var(--color-primary) 0.76%,
          var(--color-primary-purple) 100%
      );
    }
  }

  button.sidebar-item__element {
    width: 100%;
    background-color: transparent;
    border: none;
    cursor: pointer;
    user-select: none;

    &:focus {
      outline: none;
    }
  }

  &__icon {
    display: flex;
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
    text-align: left;
    text-transform: uppercase;
    white-space: nowrap;
  }

  &__subtitle {
    overflow: hidden;
    font-weight: 500;
    font-size: 10px;
    line-height: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
