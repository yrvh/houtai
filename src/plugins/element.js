import Vue from 'vue'
import { Button, Form, FormItem, Input, Container,
        Header, Aside, Main, Menu, Submenu, MenuItemGroup,
        MenuItem, Card, Row, Col, Table,
        TableColumn, Switch, Tooltip, Pagination,
        Dialog, DatePicker, Select, Option,OptionGroup,
        Breadcrumb, BreadcrumbItem, Message, MessageBox,Badge,
        Radio,Upload,Steps,Step} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Badge)
Vue.use(Switch)
Vue.use(Radio)
Vue.use(Upload)
Vue.use(Steps)
Vue.use(Step)



Vue.prototype.$message = Message   // 为vue原型挂载message
Vue.prototype.$confirm = MessageBox.confirm // 为vue原型挂载message





