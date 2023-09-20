import { createRouter, createWebHistory } from 'vue-router'
import { useAppStore } from '@/store/app';

const routes = [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "login" */ '@/views/Auth/Login.vue'),
        },
        {
          path: '/companies',
          name: 'companies',
          component: () => import(/* webpackChunkName: "companies" */ '@/views/Companies/Companies.vue'),
        },
        {
          path: '/companies/create',
          name: 'create_company',
          component: () => import(/* webpackChunkName: "edit_company" */ '@/views/Companies/CreateCompany.vue'),
        },
        {
          path: '/companies/:companyId',
          name: 'edit_company',
          component: () => import(/* webpackChunkName: "edit_company" */ '@/views/Companies/EditCompany.vue'),
        },
        {
          path: '/employees',
          name: 'employees',
          component: () => import(/* webpackChunkName: "employees" */ '@/views/Employees/Employees.vue'),
        },
        {
          path: '/employees',
          name: 'create_employee',
          component: () => import(/* webpackChunkName: "employees" */ '@/views/Employees/CreateEmployee.vue'),
        },
        {
            path: '/employee/:employeeId',
            name: 'edit_employee',
            component: () => import(/* webpackChunkName: "edit_employees" */ '@/views/Employees/EditEmployee.vue'),
        },
        // {
        //   path: '/:pathMatch(.*)*',
        //   component: () => import(/* webpackChunkName: "not_found" */ '@/views/Errors/NotFound.vue'),
        // },
    ];
  
let router = createRouter({
    history:createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
  const store = useAppStore()
  const isAuth = await store.checkAuthUser()
  const noAuthRoutes = ['login']
  if (!noAuthRoutes.includes(to.name) && !isAuth) {
    return next("/login");
  }

  if (to.name === 'login' && isAuth) {
    return next({ name: "companies" })
  }

  if (isAuth && to.meta?.roles) {
    if (! to.meta.roles.includes(store.auth_user.role)) {
      return next({name: 'companies'})
    }
  }
  return next()
})


export default router;
