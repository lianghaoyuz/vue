import VueRouter from 'vue-router'
import Login from './components/login.vue'
import Home from './components/home.vue'
import Info from './components/info.vue'
import Sign from './components/sign.vue'
import Wel from './components/HelloWorld.vue'
import Vote from './components/teachers/vote.vue'
import Com from './components/teachers/TComment.vue'
import SCom from './components/student/scom.vue'
const routes = [{ path: '/', redirect: '/login', name: 'index' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/sign', component: Sign, name: 'sign' },
    {
        path: '/home',
        component: Home,
        name: 'home',
        redirect: '/welcome',
        children: [{ path: '/info', component: Info },
            { path: '/welcome', component: Wel },
            { path: '/votes', component: Vote },
            { path: '/com', component: Com },
            { path: '/scom', component: SCom }
        ]
    }
]
const router = new VueRouter({
    mode: 'history',
    routes
})
router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('rf_token')
    if (to.path == '/login') return next()
    else if (token) return next()
    else return next('/login')
})
export default router