import firebase from 'firebase/app';

export default {
  state: {
    info: {},
  },
  getters: {
    info: s => s.info,
  },
  actions: {
    async fetchRecords({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid');
        const sourceData = await firebase.database()
          .ref(`users/${uid}/records`)
          .once('value');
        const records = (sourceData).val() || {};
        return Object
          .keys(records)
          .map(key => ({ ...records[key], id: key }));
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async fetchRecordsById({ dispatch, commit }, id) {
      try {
        const uid = await dispatch('getUid');
        const sourceData = await firebase.database()
          .ref(`users/${uid}/records`)
          .child(id)
          .once('value');
        const record = (sourceData).val() || {};
        return {
          ...record,
          id,
        };
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async createRecord({ dispatch, commit }, record) {
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
  },
};
