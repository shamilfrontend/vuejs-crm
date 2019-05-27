import Vue from 'vue';
import Vuelidate from 'vuelidate';
import Paginate from 'vuejs-paginate';

import App from './App.vue';
import router from './router';
import store from './store';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// filters
import dateFilter from './filters/date.filter';
import currencyFilter from './filters/currency.filter';

// directives
import messagePlugin from './plugins/message.plugin';

// directives
import tooltipDirective from './directives/tooltip.directive';

// components
import Loader from './components/Loader';

import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

// filters
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);

// use plugins
Vue.use(Vuelidate);
Vue.use(messagePlugin);

// directives
Vue.directive('tooltip', tooltipDirective);

// components
Vue.component('Loader', Loader);
Vue.component('Paginate', Paginate);

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
