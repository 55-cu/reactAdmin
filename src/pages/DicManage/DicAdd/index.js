import React, { Component } from 'react';
import {Card,message,Button,Input} from 'antd'
import style from './index.module.less'
import dicManage from '../../../api/dicmanage'


class DicAdd extends Component {
 state={
    "name":"",
    "desc":'',
    "path":null,
    "topic":""
 }
 
 //增加词典数据
 dicAdd= async ()=>{
    let {err,msg} = await dicManage.dicAdd(this.state)
    if(err===-1){
        { return message.error(msg)}
    }
    this.props.history.replace('/admin/dicmanage/dicinfo')
 }
 upload= async ()=>{

    let  file = this.refs.img.files[0]
    console.log(file)
    if(!file){ return message.error('请先选择一张图片')}
    // 图片的验证
    let {size,type} = file 
    console.log(type)
    let types = ['jpg',"jpeg",'gif','png']
    if(size>1000000){ return message.warning('图片超过1m')}
    if(types.indexOf(type.split('/')[1])===-1){ return message.warning('只允许jpg.jpeg,gif,png四种类型')}
    // 将图片变成formdata对象 
     let formdata  = new FormData()
     formdata.append('img',file)
     let { err,msg,path} = await dicManage.imgUpload(formdata)
     if(err===-1){
        return message.error(msg)
     }
     this.setState({path})

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