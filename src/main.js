import Vue from 'vue';
import Vuelidate from 'vuelidate';
import Paginate from 'vuejs-paginate';
import VueMeta from 'vue-meta';
import Qui from '@qvant/qui';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import '@qvant/qui/dist/qui.css';

import router from './router';
import store from './store';

import App from './App';

// filters
import dateFilter from './filters/date.filter';
import currencyFilter from './filters/currency.filter';
import localizeFilter from './filters/localize.filter';

// directives
import titlePlugin from './plugins/title.plugin';

// components
import QContainer from '@/components/QContainer';
import QPageWrap from '@/components/QPageWrap';
import AppLoader from '@/components/AppLoader';

import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

// filters
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.filter('localize', localizeFilter);

// use plugins
Vue.use(Vuelidate);
Vue.use(titlePlugin);
Vue.use(VueMeta, { refreshOnceOnNavigation: true });
Vue.use(Qui);

// components
Vue.component('QContainer', QContainer);
Vue.component('QPageWrap', QPageWrap);
Vue.component('AppLoader', AppLoader);
Vue.component('Paginate', Paginate);

Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: 'AIzaSyDzgfL-Yxyod_zdFRCeMkuV9-FOY01a5-E',
  authDomain: 'vuejs-crm.firebaseapp.com',
  databaseURL: 'https://vuejs-crm.firebaseio.com',
  projectId: 'vuejs-crm',
  storageBucket: 'vuejs-crm.appspot.com',
  messagingSenderId: '23691170750',
  appId: '1:23691170750:web:08f588d0117f3a6d',
});

const app = null;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app');
  }
});
