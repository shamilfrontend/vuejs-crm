import Vue from 'vue';
import Vuelidate from 'vuelidate';

import App from './App.vue';
import router from './router';
import store from './store';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import dateFilter from './filters/date.filter';
import currencyFilter from './filters/currency.filter';
import messagePlugin from './plugins/message.plugin';

import Loader from './components/Loader';


import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

// filters
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);

// use plugins
Vue.use(Vuelidate);
Vue.use(messagePlugin);

// components
Vue.component('Loader', Loader);

Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: "AIzaSyDzgfL-Yxyod_zdFRCeMkuV9-FOY01a5-E",
  authDomain: "vuejs-crm.firebaseapp.com",
  databaseURL: "https://vuejs-crm.firebaseio.com",
  projectId: "vuejs-crm",
  storageBucket: "vuejs-crm.appspot.com",
  messagingSenderId: "23691170750",
  appId: "1:23691170750:web:08f588d0117f3a6d"
});

let app = null;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app');
  }
});
