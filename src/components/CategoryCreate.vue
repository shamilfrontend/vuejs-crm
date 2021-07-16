<template>
  <div>
    <div class="page-subtitle">
      <h4>Создать</h4>
    </div>

    <form @submit.prevent="submitHandler">
      <div class="input-field">
        <q-input
          v-model="title"
          id="name"
          placeholder="Название"
          :class="{invalid: $v.title.$dirty && !$v.title.required}"
        />
        <span
          v-if="$v.title.$dirty && !$v.title.required"
          class="helper-text invalid"
        >
            Введите название категории
          </span>
      </div>

      <div class="input-field">
        <q-input-number
          v-model.number="limit"
          id="limit"
          :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
        />
        <span
          v-if="$v.limit.$dirty && !$v.limit.minValue"
          class="helper-text invalid"
        >Минимальное значение {{$v.limit.$params.minValue.min}}</span>
      </div>

      <q-button native-type="submit">
        Создать
      </q-button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';

export default {
  name: 'CategoryCreate',

  data() {
    return {
      title: '',
      limit: 100,
    };
  },

  validations: {
    title: {
      required,
    },
    limit: {
      minValue: minValue(100),
    },
  },

  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        // create
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit,
        });

        // emit
        this.$emit('created', category);

        // clear form data
        this.title = '';
        this.limit = 100;
        this.$v.$reset();

        this.$notify({
          type: 'success',
          message: 'Категория была создана',
        });
      } catch {
        // do nothing
      }
    },
  },
};
</script>

<style scoped>

</style>
