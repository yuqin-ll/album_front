import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 主页
  {
    path: '/',
    name: 'index',
    component: () => import('../components/index/classMain.vue')
  },
  // 展示相册
  {
    path: '/viewAlbum/:id/:title',
    name: 'viewAlbum',
    component: () => import( '../components/index/viewAlbum.vue')
  },
  // 上传相册图片
  {
    path: '/admin/addAlbum/putImg/:id',
    name: 'putImg',
    component: () => import( '../components/index/putImg.vue')
  },
  // 添加相册
  {
    path: "/admin/addAlbum/:title",
    name: "addAlbum",
    component: () => import( "../components/index/addAlbum.vue")
  },
  // 编辑相册
  {
    path: "/admin/editAlbum/:id/:title",
    name: "editAlbum",
    component: () => import( "../components/index/editAlbum.vue")
  },
  // 管理页面
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../components/index/classMainAdmin.vue')
  },
  // 管理相册图片
  {
    path: '/admin/viewAlbumAdmin/:id/:title',
    name: 'viewAlbumAdmin',
    component: () => import('../components/index/viewAlbumAdmin.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
