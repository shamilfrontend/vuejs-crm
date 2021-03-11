<template>
  <form
    class="card auth-card"
    @submit.prevent="submitHandler"
  >
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          v-model.trim="email"
          id="email"
          type="text"
          :class="emailClasses"
        >
        <label for="email">Email</label>
        <small v-if="isEmailRequired" class="helper-text invalid">
          Поле Email не должно быть пустым.
        </small>
        <small v-else-if="isValidEmail" class="helper-text invalid">
          Введите корректный email.
        </small>
      </div>
      <div class="input-field">
        <input
          v-model.trim="password"
          id="password"
          type="password"
          :class="passwordClasses"
        >
        <label for="password">Пароль</label>
        <small v-if="passwordIsRequired" class="helper-text invalid">
          Поле пароля не должно быть пустым.
        </small>
        <small v-else-if="passwordIsCorrectLength" class="helper-text invalid">
          Пароль должен быть больше {{$v.password.$params.minLength.min}} символов&
          Сейчас он {{ password.length }}
        </small>
      </div>
      <div class="input-field">
        <input
          v-model.trim="name"
          id="name"
          type="text"
          :class="nameClasses"
        >
        <label for="name">Имя</label>
        <small v-if="$v.name.$dirty && !$v.name.required" class="helper-text invalid">
          Введите ваше имя.
        </small>
      </div>
      <p>
        <label>
          <input
            type="checkbox"
            v-model="agree"
          />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
const { email, required, minLength } = require('vuelidate/lib/validators');

export default {
  name: 'Register',

  data() {
    return {
      email: '',
      password: '',
      name: '',
      agree: false,
    };
  },

  metaInfo() {
    return {
      title: 'Регистрация',
    };
  },

  validations: {
    email: {
      email,
      required,
    },
    password: {
      required,
      minLength: minLength(6),
    },
    name: {
      required,
    },
    agree: {
      chacked: value => value,
    },
  },

  computed: {
    isEmailRequired() {
      return this.$v.$dirty && !this.$v.email.required;
    },
    isValidEmail() {
      return this.$v.$dirty && !this.$v.email.email;
    },
    emailClasses() {
      return {
        invalid: (this.isValidEmail) || (this.isEmailRequired),
      };
    },

    passwordIsRequired() {
      return this.$v.$dirty && !this.$v.password.required;
    },
    passwordIsCorrectLength() {
      return this.$v.$dirty && !this.$v.password.minLength;
    },
    passwordClasses() {
      return {
        invalid: (this.passwordIsRequired) || (this.passwordIsCorrectLength),
      };
    },

    nameClasses() {
      return {
        invalid: this.$v.$dirty && !this.$v.name.required,
      };
    },
  },

  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      };

      try {
        await this.$store.dispatch('register', formData);
        this.$router.push('/');
      } catch {
        // do nothing
      }
    },
  },
};
</script>

<style scoped>

</style>
