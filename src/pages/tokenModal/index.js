import React, { Component } from 'react';
import style from './tokenModal.module.less'
import { Button,Icon} from 'antd';
import {withRouter} from 'react-router-dom'
class TokenModal extends Component {
  render() {
    return (
      <div className={style.wrapper}>
        <div className={style.info}>
          <div className={style.icon}>
            <Icon type="sound" theme="twoTone" /> 
          </div>
          <div className={style.content}>
            <span>您的token已失效，请</span><Button type="link" size="large" onClick={()=>{
              this.props.history.replace('/login')
            }}>登录</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(TokenModal);