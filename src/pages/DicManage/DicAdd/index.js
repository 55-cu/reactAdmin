import React, { Component } from 'react';
import { Card, message, Button, Input, Form } from 'antd'
import style from './index.module.less'
import dicManage from '../../../api/dicmanage'


class DicAdd extends Component {
   state = {
      "name": "",
      "desc": '',
      "path": null,
      "topic": "",
      "creator": '',
      "comments": 0,
      "likes": 0,
      "ctime": "",
   }

   //增加词典数据
   dicAdd = async () => {
      let { err, msg } = await dicManage.dicAdd(this.state)
      console.log(this.state)
      if (err === -1) {
         return message.error(msg)
      }
      this.props.history.replace('/admin/dicmanage/dicinfo')
   }
   upload = async () => {
      // 1. 获取图片里的内容
      let file = this.refs.img.files[0]
      console.log(file)
      if (!file) { return message.error('请先选择一张图片') }
      // 图片的验证
      let { size, type } = file
      console.log(type)
      let types = ['jpg', "jpeg", 'gif', 'png']
      if (size > 1000000) { return message.warning('图片超过1m') }
      if (types.indexOf(type.split('/')[1]) === -1) { return message.warning('只允许jpg.jpeg,gif,png四种类型') }
      // 将图片变成formdata对象 
      //   let formdata  = new FormData()
      //   formdata.append('img',file)
      //   let { err,msg,path} = await dicManage.imgUpload(formdata)
      //   if(err===-1){
      //      return message.error(msg)
      //   }
      //   this.setState({path})
      //  调用接口
      //  将图片转化为formdata 
      let data = new FormData()
      data.append('hehe', file)
      console.log('哈哈哈', data.get('hehe'))
      let { code, msg, path } = await dicManage.img(data)
      if (code) { return message.error(msg) }
      this.setState({ path: 'http://39.99.195.178:3000' + path })
      console.log(this.state.path)
   }
   render() {
      let { desc, topic, name, path,creator,comments,likes,ctime} = this.state
      return (
         <div className={style.box}>
            <Card title='添加词典' className={style.card}>
               <Form className={style.content}> 
                  名称：<Input type='text' className={style.input} value={name} onChange={(e) => {
                     this.setState({ name: e.target.value })
                  }} /><br />
          描述：<Input type='text' className={style.input} value={desc} onChange={(e) => {
                     this.setState({ desc: e.target.value })
                  }} /><br />
         话题：<Input type='text' className={style.input} value={topic} onChange={(e) => {
                     this.setState({ topic: e.target.value })
                  }} /><br />
         评论数：<Input type='number' className={style.input} value={comments} onChange={(e) => {
                     this.setState({ comments: e.target.value })
                  }} /><br />
         点赞数：<Input type='number' className={style.input} value={likes} onChange={(e) => {
                     this.setState({ likes: e.target.value })
                  }} /><br />
         创建者：<Input type='text' className={style.input} value={creator} onChange={(e) => {
                     this.setState({ creator: e.target.value })
                  }} /><br />
         创建时间：<Input type='text' className={style.input} value={ctime} onChange={(e) => {
                     this.setState({ ctime: e.target.value })
                  }} /><br />
         图片：<input type="file" ref='img' /><br /><Button onClick={this.upload}>上传图片</Button><br /><br />
                缩略图:<br /><img width='350' height='80' src={path} alt="" /><br /><br />
                  <Button onClick={this.dicAdd}>添加</Button></Form>
            </Card>
         </div>)

   }
}

export default DicAdd;