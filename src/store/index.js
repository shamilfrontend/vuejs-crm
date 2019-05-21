import Vue from 'vue';
import Vuex from 'vuex';

// modules
import auth from './modules/auth';
import info from './modules/info';

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

  actions: {},

  modules: {
    auth,
    info,
  },
});
