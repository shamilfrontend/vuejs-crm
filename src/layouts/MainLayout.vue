<template>
  <div class="app-main-layout">
    <nav-bar />

    <side-nav />

    <main class="app-content">
      <div class="app-page">

        <router-view />

      </div>
    </main>

    <div class="fixed-action-btn">
      <a class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/NavBar';
  import SideNav from '@/components/SideNav';

  export default {
    name: "MainLayout",
    components: {
      NavBar,
      SideNav,
    },
  }
</script>

<style scoped>

</style>
