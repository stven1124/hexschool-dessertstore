/* 必要 */
import Vue from 'vue';
import App from './App';
import router from './router';

/* 自定義 */
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import './bus';
import currencyFilter from './components/filters/currency';
import VeeValidate from 'vee-validate';
import zhTW from 'vee-validate/dist/locale/zh_TW';
import VueI18n from 'vue-i18n';
import dateFilter from './components/filters/date';

Vue.use(VueI18n);

Vue.use(VueAxios, axios)
Vue.component('Loading',Loading);
Vue.filter('currency', currencyFilter);
Vue.filter('date', dateFilter);


const i18n = new VueI18n({
  locale: 'zhTW'
});
Vue.use(VeeValidate, {
  i18n,
  dictionary: {
    zhTW
  }
});

Vue.config.productionTip = false

axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  i18n,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

/* Vue router 導航守衛 */

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        next()
      } else {
        next({
          path:'/login'
        });
      }
    });
  } else {
    next()
  }
})

// 路由切換時改變標題title
router.beforeEach((to, from, next) => {
  document.title = to.meta.title + ' - 甜樂希Lovely sweet 手工創意糖霜餅乾' || '甜樂希Lovely sweet 手工創意糖霜餅乾'
  next()
})
