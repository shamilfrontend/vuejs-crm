<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <loader v-if="loading" />
      <div
        v-else
        class="row"
      >
        <category-create
          @created="addNewCategory"
        />

        <category-edit
          v-if="!!categories.length"
          :categories="categories"
          :key="categories.length + updateCount"
          @updated="updateCategories"
        />
        <p v-else>Категорий пока нет</p>
      </div>
    </section>
  </div>
</template>

<script>
  import CategoryCreate from '@/components/CategoryCreate'
  import CategoryEdit from '@/components/CategoryEdit'

  export default {
    name: "Categories",

    components: {
      CategoryCreate,
      CategoryEdit
    },

    data() {
      return {
        categories: [],
        loading: true,
        updateCount: 0,
      };
    },

    methods: {
      addNewCategory(category) {
        this.categories.push(category);
        console.log('this.categories', this.categories);
      },
      updateCategories(category) {
        const index = this.categories.findIndex(item => item.id === category.id);
        this.categories[index].title = category.title;
        this.categories[index].limit = category.limit;
        this.updateCount++;
      },
    },

    async mounted() {
      this.categories = await this.$store.dispatch('fetchCategories');
      this.loading = false;
    },
  }
</script>

<style scoped>

</style>
