import React, { Component } from 'react';
import {Card,message,Button,Input, Form,Spin} from 'antd'
import style from './index.module.less'
import dicManage from '../../../api/dicmanage'


class DicUpdate extends Component {
 state={
  spinning:false,
   "name": "",
   "desc": '',
   "img": '',
   "topic": "",
   "creator": '',
   "comments": 0,
   "likes": 0,
 }
 async componentDidMount(){
  this.setState({spinning:true})
  // 获取id
  let {id} =  this.props.match.params
  //  通过id 获取修改信息
  let result = await dicManage.findById(id) 
  let {list} = await dicManage.findById(id) 
  console.log(list[0])
  console.log(result)
  let {name,desc,img,topic,creator,comments,likes}=list[0]
  this.setState({name,desc,img,topic,creator,comments,likes})
  this.setState({spinning:false})
}
 
 //修改词典数据
 dicUpdate= async ()=>{
   let _id =  this.props.match.params.id
   console.log( _id)
   let {name,desc,img,topic,creator,comments,likes}=this.state
   let result= await dicManage.dicUpdate({_id,name,desc,img,topic,creator,comments,likes})
   console.log( result)
    let {err,msg} = result
    if(err===-1){
        return message.error(msg)
    }
    else{
      this.props.history.replace('/admin/dicmanage/dicinfo')
      return message.success('修改成功，跳回列表页')
    }  
  }
    
 upload= async ()=>{
    let  file = this.refs.img.files[0]
    if(!file){ return message.error('请先选择一张图片')}
    // 图片的验证
    let {size,type} = file 
    //console.log(type)
    let types = ['jpg',"jpeg",'gif','png']
    if(size>1000000){ return message.warning('图片超过1m')}
    if(types.indexOf(type.split('/')[1])===-1){ return message.warning('只允许jpg.jpeg,gif,png四种类型')}
   //  调用接口
   //  将图片转化为formdata 
   let data = new FormData()
   data.append('hehe',file)
   //console.log('哈哈哈',data.get('hehe'))
   let {code,msg,path} = await dicManage.img(data)
   if(code){ return message.error(msg)}
   this.setState({img:'http://39.99.195.178:3000'+path})
   //console.log(this.state.img)
 }

  render(){
   let { desc, topic, name, img,creator,comments,likes,spinning} = this.state
    return (
      <Spin spinning={spinning}>
         <div className={style.box}>
        <Card title='添加词典' className={style.card}>
          <Form className={style.content}>
           名称：<Input type='text'   className={style.input} value={name} onChange={(e)=>{
              this.setState({name:e.target.value})
           }}/><br/>
          描述：<Input type='text'  className={style.input} value={desc} onChange={(e)=>{
              this.setState({desc:e.target.value})
           }}/><br/>
         话题：<Input type='text'   className={style.input} value={topic} onChange={(e)=>{
              this.setState({topic:e.target.value})
           }}/><br/>
   
         评论数：<Input type='number' className={style.input} value={comments} onChange={(e) => {
                     this.setState({ comments: e.target.value })
                  }} /><br />
         点赞数：<Input type='number' className={style.input} value={likes} onChange={(e) => {
                     this.setState({ likes: e.target.value })
                  }} /><br />
         创建者：<Input type='text' className={style.input} value={creator} onChange={(e) => {
                     this.setState({ creator: e.target.value })
                  }} /><br />
         图片：<input type="file" ref='img' /><br /><Button onClick={this.upload}>上传图片</Button><br /><br />
                缩略图:<br /><img width='350' height='80' src={img} alt="" /><br /><br />
                <Button onClick={this.dicUpdate}>修改</Button></Form>
        </Card>
      </div>
      </Spin>)
  }
}

export default DicUpdate;