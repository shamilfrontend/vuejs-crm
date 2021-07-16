<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a
          href="#"
          @click.prevent="$emit('click')"
        >
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">
          {{ 'CRM_Title' | localize }} - {{ date | date('datetime') }}
        </span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{ userName }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <router-link
                to="/profile"
                class="black-text"
              >
                <i class="material-icons">account_circle</i> {{'ProfileTitle' | localize}}
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a
                href="#"
                class="black-text"
                @click.prevent="logOut"
              >
                <i class="material-icons">assignment_return</i> {{'Exit' | localize}}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',

  data() {
    return {
      date: new Date(),
      interval: null,
      dropdown: null,
    };
  },

  computed: {
    userName() {
      return this.$store.getters.info.name;
    },
  },

  methods: {
    async logOut() {
      try {
        await this.$store.dispatch('logOut');
        this.$router.push('/login?message=logout');
      } catch {
        // do nothing
      }
    },
  },

  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000);
  },

  beforeDestroy() {
    clearInterval(this.interval);
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  },
};
</script>

<style scoped>

</style>
