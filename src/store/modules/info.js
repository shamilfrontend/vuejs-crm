import firebase from 'firebase/app';

export default {
  state: {
    info: {},
  },
  getters: {
    info: s => s.info
  },
  mutations: {
    setInfo(state, payload) {
      state.info = payload;
    },
    clearInfo(state) {
      state.info = {};
    },
  },
  actions: {
    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid');
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value'))
          .val();
        commit('setInfo', info);
      } catch (e) {
      }
    },
  }
};
