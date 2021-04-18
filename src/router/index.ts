import store from '@/store';
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
const Home = () => import(/* webpackChunkName: "Home" */ '@/views/Home.vue');
const Profile = () => import(/* webpackChunkName: "Profile" */ '@/views/Profile.vue');

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { selector: to.hash };
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

export default router;
