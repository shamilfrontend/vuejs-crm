<template>
  <div
    class="sidebar"
    :class="sidebarClasses"
  >
    <q-scrollbar class="sidebar__scroll">
      <div class="sidebar__inner">
        <router-link
          to="/"
          aria-label="На главную"
          class="sidebar__logo"
          :class="{ 'sidebar__logo_short': isCollapsed }"
        >
          Учет Финансов
        </router-link>

        <side-bar-item
          :is-collapsed="isCollapsed"
          title="Профиль"
          :subtitle="'aaa'"
          path="/profile"
          icon="q-icon-account"
        />

        <div class="sidebar__divider" />

        <side-bar-item
          v-for="(menuItem, index) in menuList"
          :key="index"
          :is-collapsed="isCollapsed"
          :title="menuItem.label"
          :path="menuItem.path"
          :icon="menuItem.icon"
          :exact="menuItem.exact"
        />

        <div class="sidebar__divider sidebar__divider_auto" />

        <side-bar-item-exit :is-collapsed="isCollapsed" />
      </div>
    </q-scrollbar>

    <button
      class="sidebar__toggler"
      type="button"
      @click="handleTogglerClick"
    >
      <span class="q-icon-triangle-right" />
    </button>
  </div>
</template>

<script>
import localizeFilter from '@/filters/localize.filter';

import SideBarItem from './SideBarItem';
import SideBarItemExit from './SideBarItemExit';

const LS_COLLAPSED_KEY = 'is_sidebar_collapsed';

export default {
  name: 'TheSideBar',

  components: {
    SideBarItem,
    SideBarItemExit,
  },

  data() {
    return {
      isCollapsed: false,
    };
  },

  computed: {
    sidebarClasses() {
      return {
        sidebar_collapsed: this.isCollapsed,
      };
    },

    menuList() {
      return [
        {
          label: localizeFilter('Menu_Bill'),
          path: '/',
          icon: 'q-icon-diagram-round',
          exact: true,
        },
        {
          label: localizeFilter('Menu_History'),
          path: '/history',
          icon: 'q-icon-diagram-round',
          exact: true,
        },
        {
          label: localizeFilter('Menu_Planning'),
          path: '/planning',
          icon: 'q-icon-diagram-round',
          exact: true,
        },
        {
          label: localizeFilter('Menu_NewRecord'),
          path: '/record',
          icon: 'q-icon-diagram-round',
          exact: true,
        },
        {
          label: localizeFilter('Menu_Categories'),
          path: '/categories',
          icon: 'q-icon-diagram-round',
          exact: true,
        },
      ];
    },
  },

  created() {
    this.recoverySidebarState();
  },

  methods: {
    recoverySidebarState() {
      const isCollapsed = localStorage.getItem(LS_COLLAPSED_KEY);
      if (isCollapsed !== null) this.isCollapsed = Boolean(Number(isCollapsed));
    },

    handleTogglerClick() {
      const newValue = !this.isCollapsed;
      localStorage.setItem(LS_COLLAPSED_KEY, newValue ? 1 : 0);
      this.isCollapsed = newValue;
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  position: relative;
  width: 248px;
  height: 100%;
  background-image: var(--gradient-secondary);
  box-shadow: 4px 4px 10px rgba(var(--color-rgb-blue), 0.4),
    -4px -4px 10px var(--color-tertiary-white);
  transition: width ease-in 0.25s;

  &_collapsed {
    width: 104px;
  }

  &__scroll {
    height: 100%;
  }

  &__inner {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding-bottom: 40px;
  }

  &__logo {
    display: block;
    width: 100%;
    max-width: 100%;
    margin-bottom: 40px;
    padding: 24px 34px;
    color: var(--color-tertiary-gray-lighter);
    font-size: 24px;
    line-height: 44px;

    &_short {
      width: 36px;
    }
  }

  &__divider {
    min-height: 32px;

    &_auto {
      flex: 1;
    }
  }

  &__toggler {
    position: absolute;
    top: 34px;
    right: -13px;
    z-index: 5;
    width: 28px;
    height: 28px;
    padding: 0;
    text-align: center;
    background-color: var(--color-tertiary-white);
    border: none;
    border-radius: 50%;
    outline: none;
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.24);
    transform: rotate(-180deg);
    cursor: pointer;
    transition: transform 0.25s ease;

    & .q-icon-triangle-right {
      font-size: 24px;
      line-height: 28px;
      color: var(--color-primary-blue);
    }

    .sidebar_collapsed & {
      transform: rotate(0);
    }
  }
}
</style>
