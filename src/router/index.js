const routers = [
    {
        path: '/',
        name:'home',
        meta: {
            title: '首页'
        },
        component: (resolve) => require(['@/pages/home'], resolve)
    },
    {
        path: '/a',
        name:'a',
        meta: {
            title: 'A页'
        },
        component: (resolve) => require(['@/pages/A'], resolve)
    },
    {
        path: '/b',
        name:'b',
        meta: {
            title: 'B页'
        },
        component: (resolve) => require(['@/pages/B'], resolve)
    }
];
export default routers;