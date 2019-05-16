import firebase from 'firebase/app';

export default {
  state: {},

  getters: {},

  mutations: {},

  actions: {
    async login({dispatch, commit}, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        throw e;
      }
    },
  },
}
