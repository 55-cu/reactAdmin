import React, { Component } from 'react';
import {Icon,Button,Divider,Popconfirm,Modal,message} from 'antd'
import style from './hot.module.less'
import hotApi from '../../../api/hot.js'
import { Table,Pagination,Spin} from 'antd';
class index extends Component {
  state = {
    visible:false,
    confirmLoading:false,
    columns: [
      {
        title: '话题',
        dataIndex: 'name',
        width: 120,
        key:"name"
      },
      {
        title: '热度',
        dataIndex: 'hot',
        width: 80,
        key:"hot",
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.hot - b.hot,
      },
      {
        title: '描述',
        dataIndex: 'desc',
        width: 180,
        key:"desc"
      },
      {
        title: '操作',
        width: 120,
        key:"options",
        render:(recode)=>{
          return (
            <div>
              <Popconfirm title="确认删除吗？" onConfirm={this.delConfirm.bind(this,recode._id)} okText="Yes" cancelText="No" icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}>
                <Button type="link" size="small">删除</Button>
              </Popconfirm>
              <Divider type="vertical" />
              <Popconfirm onConfirm={this.updateConfirm.bind(this,recode._id)} title="确认修改吗？" okText="Yes" cancelText="No" icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}>
                <Button type="link" size="small">编辑</Button>
              </Popconfirm>            
            </div>
          )
        }
      }
    ],
    data:[],
    page:1,
    pageSize:9,
    count:0,
    loading:true
  };
  //确认删除
  delConfirm(id){
    hotApi.delTopic(id)
    .then((data)=>{
      if(data.err === 0){
        message.warning('删除成功')
      }
    })
  }
  //确认编辑
  updateConfirm(id){
    hotApi.updateTopic(id)
    .then((data)=>{
      if(data.err === 0){
        this.setState({
          visible: true,
        });
      }
    })
  }
  //编辑模态框确认时间
  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 1000);
  };
  //编辑模态框关闭事件
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };
  //声明周期获取数据
  async componentDidMount(){
    this.getListData()
  }
  // 获取热门话题数据
  getListData= async ()=>{
    let {page,pageSize}  = this.state
    let {err,list,allCount} = await hotApi.getData({page,pageSize})
    if(err !== 0){ return }
    this.setState({data:list,count:allCount,loading:false})
  }
  render() {
    let {columns,data,page,pageSize,count,loading,visible,confirmLoading} = this.state
    console.log(count,typeof count)
    return (
      <div className={style.hot}>
        <div className={style.header}>
          <Icon type="fire"/><span>热门话题</span>
        </div>
        <div className={style.wrapper}>
          <Spin tip="Loading..." spinning={loading}>
            <Table bordered columns={columns} dataSource={data} rowKey='_id' pagination={false} />
          </Spin>
        </div>
        <Pagination showQuickJumper className={style.page} current={page}  total={count} pageSize={pageSize}
          onChange={(page,pageSize)=>{
            //只要页码数发生改变就会触发          
            this.setState({page,loading:true},()=>{
              this.getListData()
            })   
          }}
          />
          <Modal
          title="编辑"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <p>编辑</p>
        </Modal>
      </div>
    );
  }
}

export default index;