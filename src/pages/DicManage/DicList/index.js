import React, { Component } from 'react';
import {Pagination,Card,message,Table,Button,Popconfirm,Icon} from 'antd'
import style from './index.module.less'
import dicManage from '../../../api/dicmanage'

class DicList extends Component {
 state={
   page:1,
   pageSize:2,
   list:[],
   count:0,
   kw:'',
   columns:[
     {title:'_id', dataIndex:'_id',key:'_id' },
     {title:'名称', dataIndex:'name',key:'name' },
     {title:'话题', dataIndex:'topic',key:'topic' },
     {title:'图片', dataIndex:'img',key:'img' },
     {title:'描述', dataIndex:'desc',key:'desc' },
     {title:'操作', dataIndex:'action',key:'action',render:(recode)=>{
         return(
           <div>
               <Popconfirm  title='你确定要删除这个词语吗?' onConfirm={()=>{
                   this.delDic(recode._id)
                  }}>
                <Button type='danger' size='small'>删除</Button>  
                <Button type='primary' size='small'
                onClick={()=>{
                  this.props.history.replace('/admin/dicmanage/dicupdate'+recode._id)
                }}
                >修改</Button>  
               </Popconfirm>
             
           </div>
         )
     }},
   ]
 }
 componentDidMount(){
    this.getDicdata()
  }
 //删除词典
 delDic= async (_id)=>{
    let {err,msg} = await dicManage.dicDel(_id)
    if(err===-1){
        return message.error(msg)
    }
    this.getDicdata()
 }
 //获取词典数据
 getDicdata= async ()=>{
    let {page,pageSize}  = this.state
    let {err,msg,list,allcount} = await dicManage.findByPage(page,pageSize)
    if(err===-1){
        return message.error(msg)
    }
    this.setState({list,count:allcount})
 }
 //关键字查询
 getDicDataByKw = async(kw)=>{
    let {page,pageSize}  = this.state
    let {err,msg,list,allcount} = await dicManage.findByPage(kw,page,pageSize)
    if(err===-1){
        return message.error(msg)
    }
    this.setState({list,count:allcount})
 }
  render(){
    let {list,columns,count,pageSize,page,kw} = this.state
    return (
      <div className={style.box}>

        <Card title='词典列表' className={style.card}>
           <div className={style.button}>
           {/* <Button type='primary' onClick={()=>{
             this.props.history.push('/admin/dicmanage/dicadd')
           }}>商品添加</Button> */}
           <div>
             <input type='text'  placeholder='关键字查询' className={style.input} value={kw} onChange={(e)=>{
              this.setState({kw:e.target.value})
           }}/>
           <Icon type='search' onClick={()=>{
              this.getDicDataByKw(kw,page,pageSize)
           }}></Icon>
           </div>
           </div>
          
           <Table 
              scroll={ {y:300,x:840} }
              pagination={false}
              columns={columns} 
              dataSource={list} 
              rowKey='_id'>
            </Table>
            <Pagination  current={page}total={count} showQuickJumper pageSize={pageSize}
            onChange={(page)=>{
              //只要页码数发生改变就会触发          
              this.setState({page},()=>{
                this.getDicData()
              })   
            }}
            />
        </Card>
      </div>
    )
  }
}

export default DicList;