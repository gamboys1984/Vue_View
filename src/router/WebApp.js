import VersionList from '@/Page/WebApp/VersionControl/VersionList'
import MobilePage from '@/components/Share/WebApp/MobilePage'
import VersionDetail from '@/Page/WebApp/VersionControl/VersionDetail'
const MobileHome = r => require.ensure([], () => r(require('@/Page/WebApp/MobileHome')), 'group-foo')
const MobileDetails = r => require.ensure([], () => r(require('@/components/WebApp/MobileDetails')), 'group-foo')
const MobileProblemToDetail = r => require.ensure([], () => r(require('@/Page/WebApp/MobileProblemToDetail')), 'group-foo')

const MobileList = r => require.ensure([], () => r(require('@/Page/WebApp/MobileList')), 'group-foo')
const MobileFAQDetail = r => require.ensure([], () => r(require('@/Page/WebApp/MobileFAQDetail')), 'group-foo')
const MobileFAQAgain = r => require.ensure([], () => r(require('@/Page/WebApp/MobileFAQAgain')), 'group-foo')
const MobileFAQAdd = r => require.ensure([], () => r(require('@/Page/WebApp/MobileFAQAdd')), 'group-foo')
const MobileImgInfo = r => require.ensure([], () => r(require('@/Page/WebApp/MobileImgInfo')), 'group-foo')
const MobileFAQDetailOld = r => require.ensure([], () => r(require('@/Page/WebApp/MobileFAQDetailOld')), 'group-foo')

export default [{
  path: process.env.ROUTER_PATH + '/mobile',
  name: 'MobilePage',
  component: MobilePage,
  children: [
    {
      path: 'VersionDetail/:id',
      component: VersionDetail
    },
    {
      path: 'VersionList/:phoneType',
      component: VersionList,
      meta: { keepAlive: true }
    },
    {
      path: 'VersionList/:phoneType/:isProp',
      component: VersionList,
      meta: { keepAlive: true }
    },
    {
      path: 'VersionList/:id',
      component: VersionList
    },
    {
      path: 'VersionList',
      component: VersionList
    },
    {
      path: 'home',
      component: MobileHome,
      meta: { keepAlive: true }
    },
    {
      path: 'toDetail/:ProblemId',
      component: MobileProblemToDetail
    },
    {
      path: 'details/:id',
      component: MobileDetails
    },
    {
      path: 'VersionDetail/:id/:DisplayNum',
      component: VersionDetail
    },
    {
      path: 'List',
      component: MobileList
    },
    {
      path: 'FAQDetail/:id/:title',
      component: MobileFAQDetail
    },
    {
      path: 'FAQDetailOld/:id/:title',
      component: MobileFAQDetailOld
    },
    {
      path: 'FAQAgain/:id/:title',
      component: MobileFAQAgain
    },
    {
      path: 'AddFAQInfo',
      component: MobileFAQAdd
    },
    {
      path: 'MobileImgInfo',
      component: MobileImgInfo
    }
    /* {
      path: 'CirculatePage',
      component: CirculatePage
    }, */
  ]
}
]
