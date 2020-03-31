import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Nav from '../../components/Nav'
import Modal from '../tokenModal'
import style from './admin.module.less'
import { Layout, Breadcrumb, Button, Dropdown, Menu, Icon } from 'antd';
import { connect } from 'react-redux'

const { Header, Content, Footer, Sider } = Layout;


class Admin extends Component {
  state = {
    collapsed: false,
    user: '',
    show: false,
    administrator: '',
   
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  toLogin = () => {
    this.props.history.push('/login')
    localStorage.removeItem('token')
  }
  changeUl=()=>{
    this.setState({visiable:true })
  }
  componentDidMount() {
    //获取用户名
    if (localStorage.getItem('user')) {
      let result = JSON.parse(localStorage.getItem('user'))
      this.setState({ user: result.user })
      console.log(result.leavel)
      if (result.leavel === 'root') {
        this.setState({ administrator: 1 })
      }
    }
    let token = localStorage.getItem('token')
    if (token) {
      this.setState({ show: true })
    }
  }
  exitLogin = () => {
    localStorage.setItem('user', '')
    this.setState({ user: '' })
  }


  render() {
    const menu = (
      <Menu>
        <Menu.Item key='1'>
          <Button onClick={this.changeUl}>个人中心</Button>
        </Menu.Item>
        <Menu.Item key='2' >
          <Button onClick={this.toLogin}>退出登录</Button>
        </Menu.Item>
      </Menu>)
    let { tokenModal } = this.props
    let { show, administrator } = this.state
    return (
      <Layout style={{ minHeight: '100vh' }}>
        {tokenModal ? <Modal></Modal> : ''}
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className={style.logo}>Logo</div>
          <Nav></Nav>
        </Sider>
        <Layout className="site-layout">
          <Header className={style.header} style={{ padding: 0 }}>
            <div className={style.headerDiv}>
              <h1 style={{ float: "left", color: '#fff' }}>小鸡词典</h1>
            </div>
            <div className={style.right}>
              
              {!show || <Dropdown overlay={menu} className={style.Dropdown}>
                <span className={style.headerBtn} >
                {administrator === 1 ? '超级管理员' : '普通管理员'}<Icon type="down" />
                </span>
              </Dropdown>}
             
            </div>
            {/* <Button type="link" onClick={this.toLogin} className={style.login}>登录</Button> */}
          </Header>
          <Content >
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

export default connect(state => state)(withRouter(Admin));