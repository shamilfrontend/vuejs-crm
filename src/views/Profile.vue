<template>
  <div>
    <div class="page-title">
      <h3>{{ 'ProfileTitle' | localize }}</h3>
    </div>

    <form
      class="form"
      @submit.prevent="submitHandler"
    >
      <div class="input-field">
        <input
          v-model="name"
          id="description"
          type="text"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
        >
        <label for="description">{{ 'Name' | localize }}</label>
        <small
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid"
        >
          {{ 'Message_EnterName' | localize  }}
        </small>
      </div>

      <div class="switch">
        <label>
          En
          <input
            v-model="isRuLocale"
            type="checkbox"
          >
          <span class="lever"></span>
          Ru
        </label>
      </div>

      <button
        class="btn waves-effect waves-light"
        type="submit"
      >
        {{ 'Update' | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'Profile',

  data() {
    return {
      name: '',
      isRuLocale: true,
    };
  },

  metaInfo() {
    return {
      title: this.$title('ProfileTitle'),
    };
  },

  validations: {
    name: {
      required,
    },
  },

  computed: {
    info() {
      return this.$store.getters.info;
    },
  },

  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        await this.$store.dispatch('updateInfo', {
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US',
        });
      } catch {
        // do nothing
      }
    },
  },

  mounted() {
    this.name = this.info.name;
    this.isRuLocale = this.info.locale === 'ru-RU';
    this.$nextTick(() => {
      M.updateTextFields();
    });
  },
};
</script>

<style scoped>
  .switch {
    margin-bottom: 2rem;
  }
</style>
