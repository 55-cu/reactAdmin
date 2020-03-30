import React, { Component } from 'react';
import {Card,message,Button,} from 'antd'
import style from './index.module.less'
import dicManage from '../../../api/dicmanage'


class DicAdd extends Component {
 state={
    "name":"",
    "desc":'',
    "path":null,
    "topic":"",
    "creator":'fan'
 }
 
 //增加词典数据
 dicAdd= async ()=>{
    let {err,msg} = await dicManage.dicAdd(this.state)
    if(err===-1){
        return message.error(msg)
    }
    this.props.history.replace('/admin/dicmanage/dicinfo')
 }
 upload=async ()=>{
    // 1. 获取图片里的内容
    let  file = this.refs.img.files[0]
    if(!file){ return message.error('请先选择一张图片')}
    // 图片的验证
    let {size,type} = file 
    console.log(type)
    let types = ['jpg',"jpeg",'gif','png']
    if(size>1000000){ return message.warning('图片超过1m')}
    if(types.indexOf(type.split('/')[1])===-1){ return message.warning('只允许jpg.jpeg,gif,png四种类型')}
    // 调用接口
    // 将图片转化为formdata 
    let data = new FormData()
    data.append('hehe',file)
    console.log('哈哈哈',data.get('hehe'))
    let {code,msg,path} = await dicManage.img(data)
    if(code){ return message.error(msg)}
    this.setState({path:'http://39.99.195.178:3000'+path})
    console.log(this.state.path)
  }

  render(){
    let {desc,topic,name,path} = this.state
    return (
      <div className={style.box}>
        <Card title='添加词典' className={style.card}>
           名称：<input type='text'   className={style.input} value={name} onChange={(e)=>{
              this.setState({name:e.target.value})
           }}/><br/>
          描述：<input type='text'  className={style.input} value={desc} onChange={(e)=>{
              this.setState({desc:e.target.value})
           }}/><br/>
         话题：<input type='text'   className={style.input} value={topic} onChange={(e)=>{
              this.setState({topic:e.target.value})
           }}/><br/>
        图片：<input type="file" ref='img'/> <Button onClick={this.upload}>上传图片</Button><br/><br/>
                缩略图:<img width='120' height='80' src={path} alt=""/><br/><br/>
                <button onClick={this.dicAdd}>添加</button>
        </Card>
      </div>)
    
  }
}

export default DicAdd;