<template>
  <div>
    <q-input v-model="value" />
    <pre>{{ value }}</pre>

    <div class="page-title">
      <h3>{{'Bill' | localize}}</h3>

      <button
        class="btn waves-effect waves-light btn-small"
        @click="refresh"
      >
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <app-loader v-if="loading"/>
    <div
      v-else
      class="row"
    >
      <home-bill
        :rates="currency.rates"
      />

      <home-currency
        :rates="currency.rates"
        :date="currency.date"
      />
    </div>
  </div>
</template>

<script>
import HomeBill from '@/components/HomeBill';
import HomeCurrency from '@/components/HomeCurrency';

export default {
  name: 'home',

  data() {
    return {
      loading: true,
      currency: null,
      value: '',
    };
  },

  components: {
    HomeBill,
    HomeCurrency,
  },

  metaInfo() {
    return {
      title: this.$title('CRM_Title'),
    };
  },

  methods: {
    async refresh() {
      this.loading = true;
      // сервис для получения данных await this.$store.dispatch('fetchCurrency')
      this.currency = {
        base: 'EUR',
        date: '2019-05-31',
        rates: {
          USD: 1.119845,
          EUR: 1,
          RUB: 73.322553,
        },
        EUR: 1,
        RUB: 73.322553,
        USD: 1.119845,
        success: true,
        timestamp: 1559342345,
      };
      this.loading = false;
    },
  },

  async mounted() {
    this.refresh();
  },
};
</script>
