import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import Nav from '../../components/Nav'
import Modal from '../tokenModal'
import style from './admin.module.less'
import { Layout, Breadcrumb,Button } from 'antd';
import {connect} from 'react-redux'
// import {bindActionCreators} from 'redux'
// import actionCreator from '../../store/actionCreator';

const { Header, Content, Footer, Sider } = Layout;

class Admin extends Component {
  state = {
    collapsed: false,
    user: ''
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  toLogin=()=>{
    this.props.history.push('/login')
    console.log(this)
  }
  componentDidMount(){
    if(localStorage.getItem('user')){
      let user = localStorage.getItem('user')
      this.setState({user})
    }
  }
  exitLogin=()=>{
    localStorage.setItem('user','')
    this.setState({user:''})
  }
  render() {
    let {tokenModal} = this.props
    return (
      <Layout style={{ minHeight: '100vh' }}>
        {tokenModal?<Modal></Modal>:''}
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className={style.logo}>Logo</div>
          <Nav></Nav>
        </Sider>
        <Layout className="site-layout">
          <Header className={style.header} style={{ padding: 0 }}>
              {this.state.user?<div>欢迎:{this.state.user}<Button onClick={this.exitLogin}>退出</Button></div>:<div onClick={this.toLogin}>登录</div>}
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default connect(state=>state)(withRouter(Admin));