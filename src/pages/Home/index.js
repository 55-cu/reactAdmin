import React, { Component } from 'react';
import style from './home.module.less'


class Home extends Component {
  render(){
    return (
      <div className={style.home}>
        <div>
          <img src="https://jikipedia.com//images/logo/logo_full_side.png" alt="logo展示" />
        </div>
      </div>
    )
  }
}

export default Home;