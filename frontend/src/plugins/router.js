import Vue from 'vue'
import Router from 'vue-router'

import WebsiteTemplate from '@/components/website/Template'
import Login from '@/components/website/login/Login'
import UserRegister from '@/components/website/user/Register'
import WebsystemTemplate from '@/components/websystem/Template'
import StudentList from '@/components/websystem/student/List'
import StudentRegister from '@/components/websystem/student/Register'
import StudentUpdate from '@/components/websystem/student/Update'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: WebsiteTemplate,
      children: [
        {
          path: 'login',
          component: Login
        },
        {
          path: 'users',
          component: UserRegister
        }
      ]
    },
    {
      path: '/websystem',
      component: WebsystemTemplate,
      children: [
        {
          path: 'students-list',
          component: StudentList
        },
        {
          path: 'students',
          component: StudentRegister
        },
        {
          path: 'students/:id',
          component: StudentUpdate,
          props: true
        }
      ]
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
});
