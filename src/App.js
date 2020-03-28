import './App.css';
import React, { Component } from 'react';
import {HashRouter,Route,Redirect} from 'react-router-dom'
//引入重置样式文件
import './reset.css'
import loadalbe from "./utils/lazy.js"
const Admin = loadalbe(()=>import('./pages/Admin'))
const HotList = loadalbe(()=>import('./pages/Hot/HotList'))
const AddHot = loadalbe(()=>import('./pages/Hot/AddHot'))
const Home = loadalbe(()=>import('./pages/Home'))

class App extends Component {
  constructor() {
    super();
    this.state={
      user:''
    }
  }
  changeLogin=(user)=>{
    this.setState({user})
  }
  render() {
    return (
      <HashRouter className="App">
        <Route path="/admin" render={()=>{
          return (
            <Admin>
              <Route path="/admin/hot/list" component={HotList}></Route>
              <Route path="/admin/hot/add" component={AddHot}></Route>
              <Route path="/admin/home" component={Home}></Route>
            </Admin>
          )
        }}></Route>
        <Redirect exact from="/" to="/admin/home"></Redirect>
      </HashRouter>
    );
  }
}

export default App;
