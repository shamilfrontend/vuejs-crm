<template>
  <ul :class="sidenavClasses">
    <router-link
      v-for="(item, index) in links"
      :key="index"
      :to="item.url"
      tag="li"
      active-class="active"
      :exact="item.exact"
    >
      <a
        class="waves-effect waves-orange pointer"
      >
        {{ item.title }}
      </a>
    </router-link>
  </ul>
</template>

<script>
import localizeFilter from '@/filters/localize.filter';

export default {
  name: 'SideNav',

  props: ['value'],

  data() {
    return {
      links: [
        {
          title: localizeFilter('Menu_Bill'),
          url: '/',
          exact: true,
        },
        {
          title: localizeFilter('Menu_History'),
          url: '/history',
        },
        {
          title: localizeFilter('Menu_Planning'),
          url: '/planning',
        },
        {
          title: localizeFilter('Menu_NewRecord'),
          url: '/record',
        },
        {
          title: localizeFilter('Menu_Categories'),
          url: '/categories',
        },
      ],
    };
  },

  computed: {
    sidenavClasses() {
      return {
        'sidenav app-sidenav': true,
        open: this.value,
      };
    },
  },
};
</script>
