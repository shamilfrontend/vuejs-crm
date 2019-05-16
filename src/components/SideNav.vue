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
  export default {
    name: "SideNav",

    props: ['value'],

    data() {
      return {
        links: [
          {
            title: 'Счет',
            url: '/',
            exact: true
          },
          {
            title: 'История',
            url: '/history',
          },
          {
            title: 'Планирование',
            url: '/planning',
          },
          {
            title: 'Новая запись',
            url: '/record',
          },
          {
            title: 'Категории',
            url: '/categories',
          },
        ],
      };
    },

    computed: {
      sidenavClasses() {
        return {
          'sidenav app-sidenav': true,
          'open': this.value,
        };
      },
    },
  }
</script>
