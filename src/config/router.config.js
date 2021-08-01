// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home', keepAlive: true },
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        hidden: false,
        component: () => import('@/views/dashboard/Home'),
        meta: { title: 'HOME', icon: 'home', permission: ['dashboard'], keepAlive: true }
      },
      {
        path: '/biomarker',
        name: 'biomarker',
        hidden: false,
        component: () => import('@/views/biomarker/QueryTable'),
        meta: { title: 'BIOMARKER', icon: 'filter', permission: ['dashboard'], keepAlive: true }
      },
      {
        path: '/biomarker-details/:biomarkerId',
        name: 'biomarker-details',
        hidden: true,
        component: () => import('@/views/biomarker/BiomarkerDetails'),
        props: route => ({ biomarkerId: route.params.biomarkerId, tagName: route.query.tagName }),
        meta: { title: 'Biomarker Details', icon: 'sketch', permission: ['dashboard'], keepAlive: true }
      },
      {
        path: 'https://www.yuque.com/prophet-project/help/ix11s3',
        name: 'download',
        hidden: false,
        meta: { title: 'DOWNLOAD', icon: 'download', target: '_blank' }
      },
      {
        path: '/knowledge',
        name: 'knowledge',
        hidden: false,
        component: () => import('@/views/knowledge/SearchPage'),
        meta: { title: 'CURATION', icon: 'radar-chart', permission: ['dashboard'], keepAlive: true }
      },
      {
        path: '/knowledge/:paperId',
        name: 'knowledge-detail',
        hidden: true,
        component: () => import('@/views/knowledge/KnowledgeDetail'),
        props: route => ({ paperId: route.params.paperId }),
        meta: { title: 'Knowledge Details', icon: 'snippets', permission: ['dashboard'], keepAlive: false }
      },
      {
        path: '/analysis',
        name: 'analysis',
        hidden: true,
        component: () => import('@/views/about/Help'),
        meta: { title: 'Analysis', icon: 'bar-chart', permission: ['dashboard'], keepAlive: true }
      },
      // Help
      {
        path: '/about',
        name: 'about',
        hidden: false,
        component: RouteView,
        meta: { title: 'ABOUT', keepAlive: false, icon: 'question-circle', permission: ['dashboard'] },
        children: [
          {
            path: 'https://www.yuque.com/prophet-project/help/about-us',
            name: 'about-us',
            meta: { title: 'About us', target: '_blank', icon: 'team' }
          },
          {
            path: 'https://www.yuque.com/prophet-project/help/about-gliomarker',
            name: 'about-gliomarker',
            meta: { title: 'About GlioMarker', target: '_blank', icon: 'project' }
          },
          {
            path: 'https://www.yuque.com/prophet-project/changelog',
            name: 'changelog',
            meta: { title: 'ChangeLog', target: '_blank', icon: 'rocket' }
          }
        ]
      },
      {
        path: 'https://www.yuque.com/prophet-project/topics',
        name: 'feedback',
        meta: { title: 'FEEDBACK', target: '_blank', icon: 'message' }
      },
      // Exception
      {
        path: '/exception',
        name: 'exception',
        hidden: true,
        component: RouteView,
        redirect: '/exception/403',
        meta: { title: 'menu.exception', icon: 'warning', permission: ['exception'] },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: 'menu.exception.not-permission', permission: ['exception'] }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: 'menu.exception.not-find', permission: ['exception'] }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: 'menu.exception.server-error', permission: ['exception'] }
          }
        ]
      },

      // Embeded Frame
      {
        path: '/embeded-frame',
        name: 'embeded-frame',
        hidden: true,
        component: () => import('@/views/biomarker/FullFrame'),
        props: route => ({
          src: route.query.src,
          onloadfn: id => {
            document.getElementById(id).contentWindow.postMessage({ hideHeader: true }, 'http://47.117.3.66')
          }
        }),
        meta: { title: 'Embeded Frame', icon: 'dot-chart', keepAlive: false }
      },

      // account
      {
        path: '/account',
        hidden: true,
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: { title: 'menu.account', icon: 'user', keepAlive: true, permission: ['user'] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center'),
            meta: { title: 'menu.account.center', keepAlive: true, permission: ['user'] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: 'menu.account.settings', hideHeader: true, permission: ['user'] },
            redirect: '/account/settings/basic',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/basic',
                name: 'BasicSettings',
                component: () => import('@/views/account/settings/BasicSetting'),
                meta: { title: 'account.settings.menuMap.basic', hidden: true, permission: ['user'] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: {
                  title: 'account.settings.menuMap.security',
                  hidden: true,
                  keepAlive: true,
                  permission: ['user']
                }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: 'account.settings.menuMap.custom', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: 'account.settings.menuMap.binding', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: {
                  title: 'account.settings.menuMap.notification',
                  hidden: true,
                  keepAlive: true,
                  permission: ['user']
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
