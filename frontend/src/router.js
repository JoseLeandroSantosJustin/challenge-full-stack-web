import Vue from 'vue'
import Router from 'vue-router'

import Login from './components/website/login/Login'
import WebsystemTemplate from './components/websystem/Template'
import StudentList from './components/websystem/student/List'
import StudentRegister from './components/websystem/student/Register'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/system',
      component: WebsystemTemplate,
      children: [
        {
          path: 'students',
          component: StudentList
        },
        {
          path: 'students/:id',
          component: StudentRegister,
          props: true
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});
