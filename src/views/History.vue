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
        :records="records"
      />
      <pre>{{records}}</pre>
    </section>
  </div>
</template>

<script>
  import HistoryTable from '@/components/HistoryTable';

  export default {
    name: "History",

    data() {
      return {
        loading: true,
        records: [],
        categories: [],
      };
    },

    components: {
      HistoryTable,
    },

    async mounted() {
      // this.records = await this.$store.dispatch('fetchRecords');
      const records = await this.$store.dispatch('fetchRecords');
      this.categories = await this.$store.dispatch('fetchCategories');

      this.records = records.map(record => ({
        ...record,
        categoryName: this.categories.find(cat => cat.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход',
      }));

      this.loading = false;

      console.log('this.records', this.records);
      console.log('this.categories', this.categories);
    }
  }
</script>

<style scoped>

</style>
