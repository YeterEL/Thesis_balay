import { requireAuth } from './routeGuards'

const routes = [
  {
    path: '/',
    component: () => import('layouts/AppLayout.vue'),
    beforeEnter: requireAuth,
    children: [
      { path: '', component: () => import('pages/DashboardPage.vue') }
    ]
  },
  {
    path: '/register',
    component: () => import('layouts/AppLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Register.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/AppLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/verify',
    component: () => import('layouts/AppLayout.vue'),
    children: [
      { path: '', component: () => import('pages/VerificationPage.vue') }
    ]
  },
  {
    path: '/termsanconditions',
    component: () => import('layouts/AppLayout.vue'),
    beforeEnter: requireAuth,
    children: [
      { path: '', component: () => import('pages/TermsAndConditions.vue') }
    ]
  },
  {
    path: '/addhouse',
    component: () => import('layouts/AppLayout.vue'),
    beforeEnter: requireAuth,
    children: [
      { path: '', component: () => import('pages/AddHousePage.vue') }
    ]
  },
  {
    path: '/addboarder',
    component: () => import('layouts/AppLayout.vue'),
    beforeEnter: requireAuth,
    children: [
      { path: '', component: () => import('pages/AddBoarder.vue') }
    ]
  },
  {
    path: '/house/:house_id',
    component: () => import('layouts/AppLayout.vue'),
    beforeEnter: requireAuth,
    children: [
      { path: '', component: () => import('pages/HousePage.vue') }
    ]
  },
  {
    path: '/house/:house_id/edit',
    component: () => import('layouts/AppLayout.vue'),
    beforeEnter: requireAuth,
    children: [
      { path: '', component: () => import('pages/EditHousePage.vue') }
    ]
  },
  {
    path: '/boarders/:house_id',
    component: () => import('layouts/AppLayout.vue'),
    beforeEnter: requireAuth,
    children: [
      { path: '', component: () => import('pages/BoardersPage.vue') }
    ]
  },
  {
    path: '/boarders/:boarder_id/payment',
    component: () => import('layouts/AppLayout.vue'),
    beforeEnter: requireAuth,
    children: [
      { path: '', component: () => import('pages/Payment.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
