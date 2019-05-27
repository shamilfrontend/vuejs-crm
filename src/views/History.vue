<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <loader v-if="loading"/>

    <p
      v-else-if="!records.length"
      class="center"
    >
      Записей пока нет
      <router-link to="/categories">Добавить новую запись</router-link>
    </p>

    <section
      v-else
    >
      <history-table
        :records="items"
      />
      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
  import paginationMixin from '@/mixins/pagination.mixin';
  import HistoryTable from '@/components/HistoryTable';

  export default {
    name: "History",

    mixins: [paginationMixin],

    data() {
      return {
        loading: true,
        records: [],
      };
    },

    components: {
      HistoryTable,
    },

    async mounted() {
      this.records = await this.$store.dispatch('fetchRecords');
      const categories = await this.$store.dispatch('fetchCategories');

      this.setupPagination(this.records.map(record => ({
        ...record,
        categoryName: categories.find(cat => cat.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход',
      })));

      this.loading = false;
    }
  }
</script>

<style scoped>

</style>
