import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 引入echarts
import echarts from './echarts/echarts'
Vue.prototype.$echarts =echarts

//全局样式
import '../src/assets/css/global.css'

//路由文件
import VueRouter from 'vue-router'
import router from '../router'
//elementUL
import {Button,Input,Form,FormItem,Message,Header,Aside,Main,Container,Menu,Submenu,MenuItem,MenuItemGroup,Breadcrumb,BreadcrumbItem,Card,Row,Col,Table,TableColumn,Switch,Tooltip,Pagination,Dialog,MessageBox,Tag,Select,Option} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.$confirm = MessageBox.confirm

Vue.use(Option)
Vue.use(Select)
Vue.use(Tag)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(Tooltip)
Vue.use(Switch)
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(BreadcrumbItem)
Vue.use(Breadcrumb)
Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Container)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)

Vue.prototype.$message=Message

//引入axios
import axios from 'axios'
axios.defaults.baseURL="http://106.15.3.117:8887"
Vue.prototype.$http=axios
//使用路由
Vue.use(VueRouter)
import store from '../store'
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
