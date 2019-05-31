<template>
  <div>
    <div class="page-title">
      <h3>{{'History_Title' | localize}}</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <loader v-if="loading"/>

    <p
      v-else-if="!records.length"
      class="center"
    >
      {{ 'NoRecords' | localize }}
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
        :prev-text="'Back' | localize"
        :next-text="'Forward' | localize"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
  import {Pie} from 'vue-chartjs';

  import paginationMixin from '@/mixins/pagination.mixin';
  import HistoryTable from '@/components/HistoryTable';

  export default {
    name: "History",

    extends: Pie,

    mixins: [paginationMixin],

    metaInfo() {
      return {
        title: this.$title('Menu_History')
      };
    },

    data() {
      return {
        loading: true,
        records: [],
      };
    },

    components: {
      HistoryTable,
    },

    methods: {
      setup(categories) {
        this.setupPagination(this.records.map(record => ({
          ...record,
          categoryName: categories.find(cat => cat.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Доход' : 'Расход',
        })));

        this.renderChart({
          labels: categories.map(item => item.title),
          datasets: [{
            label: 'Расходы по категориям',
            data: categories.map(item => {
              return this.records.reduce((total, record) => {
                if(record.categoryId === item.id && record.type === 'outcome') {
                  total += Number(record.amount);
                }
                return total;
              }, 0);
            }),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        });
      },
    },

    async mounted() {
      this.records = await this.$store.dispatch('fetchRecords');
      const categories = await this.$store.dispatch('fetchCategories');

      this.setup(categories);

      this.loading = false;
    }
  }
</script>

<style scoped>

</style>
