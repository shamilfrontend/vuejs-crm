<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{bill | currency('RUB')}}</h4>
    </div>

    <loader v-if="loading"/>

    <p
      v-else-if="!categories.length"
      class="center"
    >
      Категорий пока нет
      <router-link to="/categories">Добавить новую категорию</router-link>
    </p>

    <section
      v-else
    >
      <div
        v-for="item in categories"
        :key="item.id"
        class="record"
      >
        <p>
          <strong>{{ item.title }}:</strong>
          {{ item.spend | currency}} из {{ item.limit | currency}}
        </p>
        <div
          class="progress"
          v-tooltip="item.tooltip"
        >
          <div
            class="determinate"
            :class="[item.progressColor]"
            :style="{width: item.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  import currencyFilter  from '@/filters/currency.filter';

  export default {
    name: "Planning",

    data() {
      return {
        loading: true,
        categories: [],
      };
    },

    computed: {
      ...mapGetters(['info']),
      bill() {
        return this.info.bill;
      },
    },

    async mounted() {
      const records = await this.$store.dispatch('fetchRecords');
      const categories = await this.$store.dispatch('fetchCategories');

      this.categories = categories
        .map(cat => {
          const spend = records
            .filter(record => record.categoryId === cat.id)
            .filter(record => record.type === 'outcome')
            .reduce((total, record) => {
              return total += +record.amount;
            }, 0);

          const percent = 100 * spend / cat.limit;
          const progressPercent = percent > 100 ? 100 : percent;
          const progressColor = percent < 60
            ? 'green'
            : percent < 100
              ? 'yellow'
              : 'red';
          const tooltipValue = cat.limit - spend;
          const tooltip = `${tooltipValue < 0
            ? 'Превышение на'
            : 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`;

          return {
            ...cat,
            progressPercent,
            progressColor,
            spend,
            tooltip,
          };
        });

      this.loading = false;
    }
  }
</script>

<style scoped>
.record {
  margin-bottom: 30px;
}
</style>
