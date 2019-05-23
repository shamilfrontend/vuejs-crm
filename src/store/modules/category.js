import firebase from 'firebase/app';

export default {
  actions: {
    async createCategory({dispatch, commit}, {title, limit}) {
      try {
        const uid = await dispatch('getUid');
        const category = await firebase.database()
          .ref(`/users/${uid}/categories`)
          .push({
            title,
            limit
          });
        return {
          id: category.key,
          title,
          limit,
        }
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async fetchCategories({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid');
        const sourceData = await firebase.database().ref(`users/${uid}/categories`).once('value');
        const categories = sourceData.val() || {};
        return Object.keys(categories).map(key => ({...categories[key], id: key}))
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async fetchCategoriesById({dispatch, commit}, id) {
      try {
        const uid = await dispatch('getUid');
        const sourceData = await firebase.database()
          .ref(`users/${uid}/categories`)
          .child(id)
          .once('value');
        const category = sourceData.val() || {};
        console.log('category', category);
        return {
          ...category,
          id,
        };
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async updateCategory({dispatch, commit}, {id, title, limit}) {
      try {
        const uid = await dispatch('getUid');
        await firebase.database()
          .ref(`users/${uid}/categories`)
          .child(id)
          .update({
            title,
            limit,
          });
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
  },
};
