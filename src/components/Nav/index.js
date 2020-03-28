import React, { Component } from 'react';
import { Menu,Icon} from 'antd';
import list from './list'
import {withRouter} from 'react-router-dom'
const { SubMenu } = Menu;

class Nav extends Component {
  //点击事件
  handleClick = e => {
    console.log(this,e)
    let {path} = e.item.props 
    this.props.history.replace(path)
  
  };
  getIcon(icon){
    switch (icon) {
      case 'user':
        return 'user'
      case 'topic':
        return 'sound'
      case 'hot':
      return 'fire'
      default:
        return 'trophy'
    }
  }
  renderItem=(data)=>{
    return data.map((item,index)=>{
      let icon = this.getIcon(item.icon)
      if(item.children){
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={icon} />
                <span>{item.title}</span>
              </span>
            }
            onClick={this.handleClick.bind(this)}
          >
            {this.renderItem(item.children)}
          </SubMenu>
        )
      }else{
        return (
          <Menu.Item key={item.key} path={item.path}>
            <Icon type={icon} />
            <span>{item.title}</span>
          </Menu.Item>
        )
      }
    })
  }
  render() {
    return (
      <div style={{ width: 200 }}>
        <Menu
        onClick={this.handleClick}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
      >
        {this.renderItem(list.root)}
      </Menu>
      </div>
      
    );
  }
}

export default withRouter(Nav);