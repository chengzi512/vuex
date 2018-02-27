import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import App from './app';
import LoadingBar from './components/loading-bar';
import routes from './router';
import store from './store';
import 'normalize.css';
import './index.less';
import utils from '@/libs/common';
import respont from '@/libs/axios';

Vue.prototype.$respont = respont;

Vue.config.productionTip = false;

// 路由配置
const RouterConfig = {
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            if (from.meta.keepAlive) {
                from.meta.savedPosition = document.body.scrollTop;
            }
            return {x: 0, y: to.meta.savedPosition || 0}
        }
    }
};
const router = new VueRouter(RouterConfig);
Vue.use(VueRouter);
Vue.use(LoadingBar);
router.beforeEach((to, from, next) => {
    LoadingBar.start();
    utils.setTitle(to.meta.title);
    next();
});

router.afterEach((to, from, next) => {
    LoadingBar.finish();
    window.scrollTo(0, 0);
});
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
})
