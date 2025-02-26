import Vue from 'vue'
import {
    LocaleProvider,
    Layout,
    Input,
    InputNumber,
    Button,
    Radio,
    Checkbox,
    Select,
    Card,
    Form,
    Row,
    Col,
    Modal,
    Table,
    Tabs,
    Icon,
    Badge,
    Popover,
    Dropdown,
    List,
    Avatar,
    Breadcrumb,
    Steps,
    Spin,
    Menu,
    Drawer,
    Tooltip,
    Alert,
    Divider,
    DatePicker,
    Upload,
    Progress,
    Skeleton,
    Popconfirm,
    Empty,
    Statistic,
    Pagination,
    Slider,
    Transfer,
    message,
    notification,
    Comment,
    ConfigProvider
} from 'ant-design-vue'

Vue.use(LocaleProvider)
Vue.use(Layout)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Button)
Vue.use(Radio)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Card)
Vue.use(Form)
Vue.use(Row)
Vue.use(Col)
Vue.use(Modal)
Vue.use(Table)
Vue.use(Tabs)
Vue.use(Icon)
Vue.use(Badge)
Vue.use(Popover)
Vue.use(Dropdown)
Vue.use(List)
Vue.use(Avatar)
Vue.use(Breadcrumb)
Vue.use(Steps)
Vue.use(Spin)
Vue.use(Menu)
Vue.use(Drawer)
Vue.use(Tooltip)
Vue.use(Alert)
Vue.use(Divider)
Vue.use(DatePicker)
Vue.use(Upload)
Vue.use(Progress)
Vue.use(Skeleton)
Vue.use(Popconfirm)
Vue.use(notification)
Vue.use(Empty)
Vue.use(Statistic)
Vue.use(Pagination)
Vue.use(Slider)
Vue.use(Transfer)
Vue.use(Comment)
Vue.use(ConfigProvider)

Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
