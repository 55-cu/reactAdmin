import React ,{Component} from 'react';
import {HashRouter,Route} from 'react-router-dom'
//设置懒加载 - cy
import loadalbe from "./utils/loadable"
//引入用户组件 - cy
import UserList from './pages/UserManage/UserList'
import UserAdd from './pages/UserManage/UserAdd'
import UserQuery from './pages/UserManage/UserQuery'
//引入数据统计表格 - cy
import EchartsPie from './pages/Echarts/Pie'
import EchartsLine from './pages/Echarts/Line'
import EchartsPiano from './pages/Echarts/Piano'
//设置懒加载 - cy 
const Login = loadalbe(()=>import('./pages/Login'))
const Admin = loadalbe(()=>import('./pages/Admin'))
class App extends Component{
    render(){
      return(
          <HashRouter>
          <Route path='/login' component={Login}></Route>
          <Route path='/admin' render ={()=>{
            return(
              <Admin>
                <Route path='/admin/user/userlist' component={UserList}></Route>
                <Route path='/admin/user/useradd' component={UserAdd}></Route>
                <Route path='/admin/user/userquery' component={UserQuery}></Route>
                <Route path='/admin/echarts/pie' component={EchartsPie}></Route>
                <Route path='/admin/echarts/line' component={EchartsLine}></Route>
                <Route path='/admin/echarts/piano' component={EchartsPiano}></Route>
              </Admin>
            )
          }}></Route>
        </HashRouter>
      )
    }
}

// import {Button} from 'antd'
// function App() {
//   return (
//     <div className="App">
//       我是首页
//       {/* <Button>按钮</Button> */}
//     </div>
//   );
// }

export default App;
