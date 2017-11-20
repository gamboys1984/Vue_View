import Vue from 'vue'
import Router from 'vue-router'
import WebApp from './WebApp'
import Web from './Web'
import ShareVideo from '@/Page/DeviceVideo/ShareVideo'

Router.prototype.goBack = function() {
    this.isBack = true
    window.history.go(-1)
}
Router.prototype.$map = {
    VersionList: 1,
    VersionDetail: 2
}

Vue.use(Router)
export default new Router({
    mode: 'history',
    history: false,
    routes: [
        {
            path: process.env.ROUTER_PATH + '/ShareVideo/:Version/:guid',
            component: ShareVideo
        },
        ...WebApp,
        ...Web
    ]
})