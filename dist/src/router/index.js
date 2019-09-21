import Vue from 'vue';
import Router from 'vue-router';

/* 後台 */
import Dashboard from '@/components/Dashboard';
import Products from '@/components/pages/Products';
import Orders from '@/components/pages/Orders';
import Coupons from '@/components/pages/Coupons';

/* 前台 */
import Index from '@/components/Index';
import CustomerIndex from '@/components/pages/CustomerIndex';
import CustomerShopping from '@/components/pages/CustomerShopping';
import CustomerCart from '@/components/pages/CustomerCart';
import CustomerCheckorders from '@/components/pages/CustomerCheckorders';
import CustomerCheckout from '@/components/pages/CustomerCheckout';
import Product from '@/components/pages/Product';


Vue.use(Router)

export default new Router({
  // 切換router時回到畫面頂部
  scrollBehavior (to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return { x: 0, y: 0 }
		}
	},
  routes: [
    {
      path: '*',
      redirect: 'index'
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true,
                  title: '後台管理' },
        },
        {
          path: 'orders',
          name: 'Orders',
          component: Orders,
          meta: { requiresAuth: true,
                  title: '後台管理' },
        },
        {
          path: 'coupons',
          name: 'Coupons',
          component: Coupons,
          meta: { requiresAuth: true,
                  title: '後台管理' },
        },
      ]
    },
    {
      path: '/',
      redirect: '/index',
      component: Index,
      children: [
        {
          path: 'index',
          name: '首頁',
          component: CustomerIndex,
          meta: {
            title: '首頁'
          }
        },
        {
          path: 'Shopping',
          name: '商品',
          component: CustomerShopping,
          meta: {
            title: '商品'
          }
        },
        {
          name:"商品介紹",
          path: 'product/:id',
          component: Product,
          meta: {
            title: '商品介紹'
          }
        },
        {
          path: 'cart',
          name: '購物車',
          component: CustomerCart,
          meta: {
            title: '購物車'
          }
        },
        {
          path: 'checkorders',
          name: '訂單',
          component: CustomerCheckorders,
          meta: {
            title: '訂單'
          }
        },
        {
          path: 'checkout/:orderId',
          name: '結帳',
          component: CustomerCheckout,
          meta: {
            title: '結帳'
          }
        }
      ]
    },
  ]
})
