import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Notes from '../views/Notes.vue'
import NewNote from '../views/NewNote.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/Signup.vue'
import store from '../store/index'
import page404 from '../views/404.vue'

Vue.use(VueRouter)

const authenticate = (to, from, next) => {
  const token = localStorage.getItem('token')
  if(token){ 
    const expirationDate = localStorage.getItem('expirationDate')
    const now = new Date()
    if(now >= expirationDate){
      if(from.name === 'login'){
        next(false)
      }else{
        next({ name: 'login'})
      }
    }else{
      next()
    }
  }else{
    next({ name: 'login'})
  }

}

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/notes',
    name: 'notes',
    component: Notes,
    beforeEnter(to, from, next){
      authenticate(to, from, next)
    }
  },
  {
    path: '/newnote',
    name: 'newnote',
    component: NewNote,
    beforeEnter(to, from, next){
      authenticate(to, from, next)
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },

  {
    path: '*',
    name: '404',
    component: page404
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.afterEach(to => {
  localStorage.setItem('LS_ROUTE_KEY', to.name);
});

export default router
