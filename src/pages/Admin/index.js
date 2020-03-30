import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Nav from '../../components/Nav'
import Modal from '../tokenModal'
import style from './admin.module.less'
import { Layout, Breadcrumb, Button, Dropdown, Menu, Icon } from 'antd';
import { connect } from 'react-redux'
import Login from '../../api/login'

const { Header, Content, Footer, Sider } = Layout;


class Admin extends Component {
  state = {
    collapsed: false,
    user: '',
    show: false,
    page:1,
    pageSize:10,
    administrator:''
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  toLogin = () => {
    this.props.history.push('/login')
    localStorage.removeItem('token')
  }
  componentDidMount(){
    //获取用户名
    if(localStorage.getItem('user')){
      let result = JSON.parse(localStorage.getItem('user'))
      this.setState({user:result.user})

  // componentDidMount() {
    
  //   if (localStorage.getItem('user')) {
  //     let user = localStorage.getItem('user')
  //     this.setState({ user })
  //   }
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
          <Button>个人中心</Button>
        </Menu.Item>
        <Menu.Item key='2' >
          <Button onClick={this.toLogin}>退出登录</Button>
        </Menu.Item>
      </Menu>)
    let { tokenModal } = this.props
    let {show,administrator } = this.state
    return (
      <Layout style={{ minHeight: '100vh' }}>
        {tokenModal ? <Modal></Modal> : ''}
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className={style.logo}>Logo</div>
          <Nav></Nav>
        </Sider>
        <Layout className="site-layout">
          <Header className={style.header} style={{ padding: 0 }}>
            <span>小鸡词典</span>
            <span className={style.bg}></span>
            {administrator === 1?'超级管理员':'普通管理员'}
            {!show || <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" onClick={this.toLogin}>
                Hover me <Icon type="down" />
              </a>
            </Dropdown>}
            {/* <Button type="link" onClick={this.toLogin} className={style.login}>登录</Button> */}
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
}
export default connect(state => state)(withRouter(Admin));