<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Menu_NewRecord' | localize }}</h3>
    </div>

    <loader v-if="loading"/>

    <p
      v-else-if="!categories.length"
      class="center"
    >
      {{'NoCategories' | localize}}
      <router-link to="/categories">Добавить новую категорию</router-link>
    </p>

    <form
      v-else
      class="form"
      @submit.prevent="submitHandler"
    >
      <div class="input-field">
        <select
          v-model="category"
          ref="select"
        >
          <option
            v-for="item of categories"
            :key="item.id"
            :value="item.id"
          >{{ item.title }}
          </option>
        </select>
        <label>{{ 'SelectCategory' | localize }}</label>
      </div>

      <p>
        <label>
          <input
            v-model="type"
            class="with-gap"
            name="type"
            type="radio"
            value="income"
          />
          <span>{{ 'Income' | localize }}</span>
        </label>
      </p>

      <p>
        <label>
          <input
            v-model="type"
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
          />
          <span>{{ 'Outcome' | localize }}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          v-model.number="amount"
          id="amount"
          type="number"
          autocomplete="off"
          :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
        >
        <label for="amount">Сумма</label>
        <span
          v-if="$v.amount.$dirty && !$v.amount.minValue"
          class="helper-text invalid"
        >Минимальное значение {{$v.amount.$params.minValue.min}}</span>
      </div>

      <div class="input-field">
        <input
          v-model="description"
          id="description"
          type="text"
          autocomplete="off"
          :class="{invalid: $v.description.$dirty && !$v.description.required}"
        >
        <label for="description">Описание</label>
        <span
          v-if="$v.amount.$dirty && !$v.description.required"
          class="helper-text invalid"
        >Необходимо ввести описание</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';

export default {
  name: 'Record',

  metaInfo() {
    return {
      title: this.$title('Menu_NewRecord'),
    };
  },

  data() {
    return {
      loading: true,
      categories: [],
      select: null,

      category: '',
      type: 'outcome',
      amount: 1,
      description: '',
    };
  },

  validations: {
    amount: {
      required,
      minValue: minValue(1),
    },
    description: {
      required,
    },
  },

  computed: {
    ...mapGetters(['info']),
    bill() {
      return this.info.bill;
    },
    canCreateRecord() {
      if (this.type === 'income') return true;
      return this.bill >= this.amount;
    },
  },

  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            type: this.type,
            amount: this.amount,
            description: this.description,
            date: new Date().toJSON(),
          });

          const bill = this.type === 'income'
            ? this.bill + this.amount
            : this.bill - this.amount;

          await this.$store.dispatch('updateInfo', {
            bill,
          });

          this.$message('Запись успешно создана!');
          this.$v.$reset();

          this.amount = 1;
          this.description = '';
        } catch {
          // do nothing
        }
      } else {
        this.$message(`Недостаточно средств на счете (${this.amount - this.bill})`);
      }
    },
  },

  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;

    if (this.categories.length) {
      this.category = this.categories[0].id;
    }

    this.$nextTick(() => {
      M.updateTextFields();
      this.select = M.FormSelect.init(this.$refs.select);
    });
  },

  beforeDestroy() {
    if (this.select && this.select.destroy) {
      // eslint-disable-next-line no-undef
      M.FormSelect.destroy();
    }
  },
};
</script>

<style scoped>

</style>
