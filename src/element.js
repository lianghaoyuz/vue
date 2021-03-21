import Vue from 'vue'
import { Form, FormItem, Input, Button, Message, MessageBox, Container, Header, Main, Aside, Menu, Submenu, MenuItem, MenuItemGroup, Breadcrumb, BreadcrumbItem } from 'element-ui'
import { Card, Row, Col, Table, TableColumn, Tooltip, Dialog, Pagination, Progress, Carousel, CarouselItem, Avatar, Rate } from 'element-ui'
Vue.use(Form).use(FormItem).use(Input).use(Button).use(Carousel).use(CarouselItem).use(Avatar).use(Rate)
Vue.use(Container).use(Header).use(Main).use(Aside).use(Menu).use(Submenu).use(MenuItem).use(MenuItemGroup).use(Breadcrumb).use(BreadcrumbItem)
Vue.use(Card).use(Row).use(Col).use(Table).use(TableColumn).use(Tooltip).use(Dialog).use(Pagination).use(Progress)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$message = Message