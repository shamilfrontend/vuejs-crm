<template>
  <div>
    <div>
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a
          class="breadcrumb"
          @click.prevent
        >
          Расход
        </a>
      </div>

      <loader v-if="loading"/>

      <div
        v-else-if="!!record"
        class="row"
      >
        <div class="col s12 m6">
          <div class="card" :class="record.typeClass">
            <div class="card-content white-text">
              <p>Описание: {{ record.description }}</p>
              <p>Сумма: {{ record.amount | currency}}</p>
              <p>Категория: {{ record.categoryName }}</p>

              <small>{{record.date | date('datetime')}}</small>
            </div>
          </div>
        </div>
      </div>
      <p
        v-else
        class="center"
      >Записи с ID <strong>{{$route.params.id}}</strong> не существует</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailRecord",

    data() {
      return {
        loading: true,
        record: true,
      };
    },

    async mounted() {
      const id = this.$route.params.id;

      if (id) {
        const record = await this.$store.dispatch('fetchRecordsById', id);
        const category = await this.$store.dispatch('fetchCategoriesById', record.categoryId);

        // this.record = record;
        this.record = {
          ...record,
          categoryName: category.title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Доход' : 'Расход',
        };

        this.loading = false;

        console.log('record', record);
      }
    }
  }
</script>

<style scoped>

</style>
