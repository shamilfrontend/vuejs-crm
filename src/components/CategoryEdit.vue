<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form
        @submit.prevent="submitHandler"
      >
        <div class="input-field">
          <select
            v-model="current"
            ref="select"
          >
            <option
              v-for="item of categories"
              :key="item.id"
              :value="item.id"
            >{{ item.title }}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
            v-model="title"
            id="name"
            type="text"
            autocomplete="off"
            :class="{invalid: $v.title.$dirty && !$v.title.required}"
          >
          <label for="name">Название</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
          >
            Введите название категории
          </span>
        </div>

        <div class="input-field">
          <input
            v-model.number="limit"
            id="limit"
            type="number"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          >
          <label for="limit">Лимит</label>
          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
          >Минимальное значение {{$v.limit.$params.minValue.min}}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';

export default {
  name: 'CategoryEdit',

  props: {
    categories: {
      type: [Array, Object],
      required: true,
    },
  },

  data() {
    return {
      select: null,
      title: '',
      limit: 100,
      current: null,
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
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit,
        };
        await this.$store.dispatch('updateCategory', categoryData);
        this.$message('Категория успешно обновлена.');
        this.$emit('updated', categoryData);
      } catch (e) {
        // code
      }
    },
  },

  watch: {
    current(catId) {
      const { title, limit } = this.categories.find(item => item.id === catId);

      this.title = title;
      this.limit = limit;
    },
  },

  created() {
    const { id, title, limit } = this.categories[0];

    this.current = id;
    this.title = title;
    this.limit = limit;
  },

  mounted() {
    M.updateTextFields();
    this.select = M.FormSelect.init(this.$refs.select);
  },

  beforeDestroy() {
    if (this.select && this.select.destroy) {
      M.FormSelect.destroy();
    }
  },
};
</script>
