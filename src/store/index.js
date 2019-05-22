import Vue from 'vue';
import Vuex from 'vuex';

// modules
import auth from './modules/auth';
import info from './modules/info';
import category from './modules/category';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null
  },

  getters: {
    error: state => state.error,
  },

  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },

  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER;
      const result = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`);
      return await result.json();
    },
  },

  modules: {
    auth,
    info,
    category,
  },
});
