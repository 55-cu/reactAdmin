import React ,{Component} from 'react';
import {HashRouter,Route,Redirect} from 'react-router-dom'
//引入重置样式文件-fan
import './reset.css'

//设置懒加载 - cy
import loadalbe from "./utils/loadable"
//引入用户组件 - cy
import UserList from './pages/UserManage/UserList'
import UserEdit from './pages/UserManage/UserEdit'
//引入数据统计表格 - cy
import EchartsPie from './pages/Echarts/Pie'
import EchartsLine from './pages/Echarts/Line'
import EchartsPiano from './pages/Echarts/Piano'
const Admin = loadalbe(()=>import('./pages/Admin'))
//引入热门话题 -fan
const HotList = loadalbe(()=>import('./pages/Hot/HotList'))
const AddHot = loadalbe(()=>import('./pages/Hot/AddHot'))
const Home = loadalbe(()=>import('./pages/Home'))

//引入空状态组件-fan
const Empty = loadalbe(()=>import('./pages/Empty'))

//设置懒加载 - cy 
const Login = loadalbe(()=>import('./pages/Login'))
class App extends Component{
    render(){
      return(
          <HashRouter>
          <Route path='/login' component={Login}></Route>
          <Route path='/admin' render ={()=>{
            return(
              <Admin>
                <Route path='/admin/user/userlist' component={UserList}></Route>
                <Route path='/admin/user/useredit' component={UserEdit}></Route>
                <Route path='/admin/echarts/pie' component={EchartsPie}></Route>
                <Route path='/admin/echarts/line' component={EchartsLine}></Route>
                <Route path='/admin/echarts/piano' component={EchartsPiano}></Route>
                <Route path="/admin/hot/list" component={HotList}></Route>
                <Route path="/admin/hot/add" component={AddHot}></Route>
                <Route path="/admin/home" component={Home}></Route>
                <Route path="/admin/echarts" component={Empty}></Route>
              </Admin>
            )
          }}></Route>
          <Redirect exact from="/" to="/admin/home"></Redirect>
        </HashRouter>
      )
    }
  }
export default App;
