import React, {Component} from 'react';
import {Card,Input,Select,Button,Avatar,Popconfirm} from 'antd';
import style from './index.module.less';
import UserApi from '../../../api/userManage';
const {Option} =Select;

class UserEdit extends Component{
    state={
        _id:'',
        name:'',
        avator:'',
        identity:'',
        // identitySign:false
    }
    componentDidMount(){
        // console.log(this.props.location.state)
        let {_id,name,avator,identity}=this.props.location.state;
        this.setState({_id:_id,name:name,avator:avator,identity:identity});
        console.log(this.state._id)
        // this.identity==="超级管理员"?this.identitySign =true:this.identitySign=false;
    }
    async submitChange(){
        let _id=this.state._id;
        let name=this.state.name;
        let pass = this.state.pass;
        let img = this.state.avator || '';
        let leavel =this.state.identity;
        let result=await UserApi.userEdit({_id,name,pass,img,leavel})
        console.log(result)
        this.props.history.push('/admin/user/userlist')
    }
    render(){
        return(
            <div>
            <Card title='用户信息编辑'>
            <p className={style.message}>编辑用户名</p>
            <Input value={this.state.name} onChange={(e)=>{
                this.setState({name:e.target.value})
            }}/>
            <p className={style.message} value="********">编辑新密码</p>
            <Input onChange={e=>{
                this.setState({pass:e.target.value})
            }}/>
            <p className={style.message}>编辑用户头像</p>
            <Input placeholder="请输入网络头像地址" className={style.avatar} onChange={e=>{
                this.setState({avator:e.target.value})
            }}/>
            {this.state.avator?
            <Avatar src={this.state.avator} shape="square" />:
            <Avatar icon="user" shape="square"/>
            }
            {/* <Button type="primary" size="small" className={style.btn1} onClick={()=>{
            }}>改变头像</Button> */}
            <p className={style.message}>编辑用户身份</p>
            {this.state.identity==="超级管理员"?
            <Select defaultValue={this.state.identity} onChange={(e)=>{
                let result= e.target.value === "超级管理员"? "root":"admin";
                this.setState({identity:result})
            }}>
                <Option value="root">超级管理员</Option>
                <Option value="admin">会员</Option>
            </Select>:null
            }
            <p className={style.btns}>
            <Popconfirm title="你确定提交吗？" onConfirm={()=>{
            if(this.state.name && this.state.pass ){
                  this.submitChange()         
            }else{
                return false
            }
            }}>
            <Button type="danger" className={style.btn1}>提交</Button>
            </Popconfirm>
            <Button type="primary" onClick={()=>{
                this.props.history.push('/admin/user/userlist');
            }}>返回</Button>
            </p>
               </Card>
            </div>
        )
    }
}

export default UserEdit;