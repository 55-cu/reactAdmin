import React, { Component } from 'react';
import {Pagination,Card,message,Table,Button,Popconfirm,Spin, Icon} from 'antd'
import style from './index.module.less'
import dicManage from '../../../api/dicmanage'
import XLSX from 'xlsx'
class DicList extends Component {
 state={
   spinning:false,
   page:1,
   pageSize:5,
   list:[],
   count:0,
   kw:'',
   columns:[
     {title:'_id', dataIndex:'_id',key:'_id' },
     {title:'名称', dataIndex:'name',key:'name' },
     {title:'话题', dataIndex:'topic',key:'topic' },
     {title:'图片', dataIndex:'img',key:'img' },
     {title:'描述', dataIndex:'desc',key:'desc' },
     {title:'评论数', dataIndex:'comments',key:'comments' },
     {title:'点赞数', dataIndex:'likes',key:'likes' },
     {title:'创建者', dataIndex:'creator',key:'creator' },
     {title:'创建时间', dataIndex:'ctime',key:'ctime' },
     {title:'操作', key:'action',render:(record)=>{
      return(
        <div>
          <Popconfirm title='你确定要删除该商品嘛?'
          onConfirm={()=>{
            console.log(record)
            this.delDic(record._id)}}
          onCancel={()=>{
            message.error('取消删除');
          }}
          >
            <Button type='danger' size='small'>删除</Button>
          </Popconfirm>
                <Button type='primary' size='small'
                onClick={()=>{
                  console.log(record)
                  this.props.history.replace('/admin/dicmanage/dicupdate/'+record._id)
                }}
                >修改</Button>  
              
             
           </div>
         )
     }},
   ]
 }
 componentDidMount(){
  this.setState({spinning:true})
    this.getDicData()
  }
 //删除词典
 delDic= async (_id)=>{
    let {err,msg} = await dicManage.dicDel(_id)
    if(err===-1){
        return message.error(msg)
    }else {
      this.getDicdata()
      return message.success('删除成功')
    }
   
  
  
 }
 //获取词典数据
 getDicData= async ()=>{
    let {page,pageSize}  = this.state
    let {err,msg,list,allcount} = await dicManage.findByPage(page,pageSize)
    if(err===-1){
        return message.error(msg)
    }
    this.setState({list,count:allcount,spinning:false})
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
 //  导出全部商品
 exportAll=async ()=>{
  // 获取表头数据
  let thead = this.state.columns.map((item)=>{ return item.title})
  // 获取要导出的数据
  let {list} = await dicManage.findByPage(1,10000)
  let data = list.map((item)=>{
    let arr = [] 
    for (const key in item) {
       arr.push(item[key])
    }
    return arr
  })

  // 将数据合并为数组 
  let result = [thead,...data]
  console.log(result)
  //导出
  let  sheet = XLSX.utils.aoa_to_sheet(result) 
  let  wb =XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb,sheet)
  XLSX.writeFile(wb,'小鸡词典全部信息.xlsx')
}
  render(){
    let {list,columns,count,pageSize,page,kw,spinning} = this.state
    return (
      <div className={style.box}>
         
        <Card title='词典列表' className={style.card}>
           <div className={style.button}>
           <div>
           <Icon type='search' onClick={()=>{
              this.getDicDataByKw(kw,page,pageSize)
           }}></Icon> 
             <input type='text'  placeholder='关键字查询' className={style.input} value={kw} onChange={(e)=>{
              this.setState({kw:e.target.value})
           }}/>
           </div>
           <div>
           <Button type='primary' onClick={()=>{
             let thead = document.getElementsByTagName('thead')[0]
             let table = document.getElementsByTagName('table')[1]
             table.appendChild(thead)
            //  console.log(table,thead) 
             var wb = XLSX.utils.table_to_book(table, {sheet:"Sheet JS"});
              // 将工作薄导出为excel文件
              XLSX.writeFile(wb,'小鸡词典信息.xlsx');
           }}>DOM导出表格</Button>&nbsp;&nbsp;
          <Button type='primary' onClick={this.exportAll}>导出全部</Button>
           </div>
           
           </div>
           <Spin spinning={spinning}>
           <Table 
              scroll={ {y:300,x:840} }
              pagination={false}
              columns={columns} 
              dataSource={list} 
              rowKey='_id'>
            </Table>
           </Spin>
            <br/>
            <Pagination  current={page} total={count} showQuickJumper pageSize={pageSize}
            onChange={(page,pageSize)=>{
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