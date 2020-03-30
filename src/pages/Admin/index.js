import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import Nav from '../../components/Nav'
import Modal from '../tokenModal'
import style from './admin.module.less'
import { Layout, Breadcrumb,Button } from 'antd';
import {connect} from 'react-redux'

const { Header, Content, Footer, Sider } = Layout;

class Admin extends Component {
  state = {
    collapsed: false,
    user: ''
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  toLogin=()=>{
    this.props.history.push('/login')
  }
  componentDidMount(){
    //获取用户名
    if(localStorage.getItem('user')){
      let result = JSON.parse(localStorage.getItem('user'))
      this.setState({user:result.user})
    }
  }
  exitLogin=()=>{
    localStorage.setItem('user','')
    this.setState({user:''})
  }
  render() {
    let {tokenModal} = this.props
    // console.log(tokenModal)
    return (
      <Layout style={{ minHeight: '100vh' }}>
        {tokenModal?<Modal></Modal>:''}
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className={style.logo}>Logo</div>
          <Nav></Nav>
        </Sider>
        <Layout className="site-layout">
          <Header className={style.header} style={{ padding: 0 }}>
              <Button type="link" onClick={this.toLogin} className={style.login}>登录</Button>
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
