import firebase from 'firebase/app';

export default {
  state: {
    info: {},
  },
  getters: {
    info: s => s.info
  },
  mutations: {
  },
  actions: {
    async createRecord({dispatch, commit}, record) {
      try {
        const uid = await dispatch('getUid');
        return await firebase.database()
          .ref(`/users/${uid}/records`)
          .push(record);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
  }
};
