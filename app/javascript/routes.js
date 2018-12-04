import LbTopics from './components/lb-topics'
import LbLinks from './components/lb-links'

export const routes = [
  { path: '/topics', component: LbTopics },
  { path: '/library', component: LbLinks },
  { path: '/library/:additional', component: LbLinks },
  { path: '/library/:id/:additional', component: LbLinks },
  { path: '*', redirect: '/library' }
]
