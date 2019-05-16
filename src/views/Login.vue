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
          Пароль должен быть больше {{$v.password.$params.minLength.min}} символов& Сейчас он {{ password.length }}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
  import {email, required, minLength} from 'vuelidate/lib/validators';
  import messages from '@/config/messages';

  export default {
    name: "Login",

    data() {
      return {
        email: '',
        password: '',
      };
    },

    validations: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      }
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
          'invalid': (this.isValidEmail) || (this.isEmailRequired),
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
          'invalid': (this.passwordIsRequired) || (this.passwordIsCorrectLength),
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
        };

        console.log('formData', formData);

        try {
          await this.$store.dispatch('login', formData);
          this.$router.push('/');
        } catch (e) {}
      },
    },

    mounted() {
      if (messages[this.$route.query.message]) {
        this.$message(messages[this.$route.query.message]);
      }
    }
  }
</script>

<style scoped>

</style>
