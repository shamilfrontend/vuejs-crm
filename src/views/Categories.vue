<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <app-loader v-if="loading" />
      <div
        v-else
        class="row"
      >
        <category-create
          @created="addNewCategory"
        />
      </div>

      <q-table
        :rows="categories"
        :groups-of-columns="groupsOfColumns"
      >
        <template #actionsRow="{ row }">
          111
        </template>
      </q-table>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate';
import CategoryEdit from '@/components/CategoryEdit';

export default {
  name: 'Categories',

  components: {
    CategoryCreate,
    CategoryEdit,
  },

  metaInfo() {
    return {
      title: this.$title('Categories'),
    };
  },

  data() {
    return {
      loading: true,
      categories: [],
      groupsOfColumns: [
        {
          columns: [
            {
              key: 'id',
              value: 'ID',
            },
            {
              key: 'title',
              value: 'Название',
            },
            {
              key: 'limit',
              value: 'Лимит',
            },
            {
              key: 'actions',
              width: '88px',
              align: 'right',
              slots: {
                row: 'actionsRow',
              },
            },
          ],
        },
      ],
      updateCount: 0,
    };
  },

  methods: {
    addNewCategory(category) {
      this.categories.push(category);
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
};
</script>

<style scoped>

</style>
