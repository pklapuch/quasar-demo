import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      createRootSubRoute(),
      createLoginSubRoute(),
      createHomeSubRoute(),
      createTestSubRoute(),
      createCatchErrorSubRoute(),
    ],
  },
];

export default routes;

function createRootSubRoute(): RouteRecordRaw {
  return {
    path: '',
    component: () => import('pages/Home/HomePage.vue'),
  };
}

function createLoginSubRoute(): RouteRecordRaw {
  return {
    path: '/login',
    component: () => import('pages/Login/LoginPage.vue'),
  };
}

function createHomeSubRoute(): RouteRecordRaw {
  return {
    path: '/home',
    component: () => import('pages/Home/HomePage.vue'),
  };
}

function createTestSubRoute(): RouteRecordRaw {
  return {
    path: '/test',
    component: () => import('pages/TestPage.vue'),
  };
}

function createCatchErrorSubRoute(): RouteRecordRaw {
  return {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  };
}
