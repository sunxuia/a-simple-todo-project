export default [{
  path: '/',
  redirect: '/pc'
}, {
  path: '/pc',
  component: () => import('../views/PCLayout'),
  name: 'pc',
  meta: {
    title: 'this is a todo app',
    description: 'some description'
  }
}, {
  path: '/mobile',
  component: () => import('../views/MobileLayout'),
  name: 'mobile',
  meta: {
    title: 'this is a todo app',
    description: 'some description'
  }
}, {
  // fallback redirect to `/`
  path: '*',
  redirect: '/',
  meta: {}
}]
