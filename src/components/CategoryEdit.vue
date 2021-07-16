<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <q-select v-model="current">
            <q-option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
              :label="category.title"
            />
          </q-select>
        </div>

        <div class="input-field">
          <q-input
            v-model="title"
            id="name"
            type="text"
            placeholder="Название"
            autocomplete="off"
          />
        </div>

        <div class="input-field">
          <q-input
            v-model.number="limit"
            id="limit"
            placeholder="Лимит"
            type="number"
          />
        </div>

        <q-button native-type="submit">
          Обновить
        </q-button>
      </form>
    </div>
  </div>
</template>

<script>
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

  methods: {
    async submitHandler() {
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit,
        };

        await this.$store.dispatch('updateCategory', categoryData);

        this.$notify({
          type: 'success',
          message: 'Категория успешно обновлена.',
        });

        this.$emit('updated', categoryData);
      } catch {
        // do nothing
      }
    },
  },

  watch: {
    current(catId) {
      const { title, limit } = this.categories.find(({ id }) => id === catId);

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
};
</script>
