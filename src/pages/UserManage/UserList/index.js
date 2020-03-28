import React, {Component} from 'react';
import style from './index.module.less';
import { Table, Input, Button, Icon, Pagination ,Card, message,Popconfirm} from 'antd';
import Highlighter from 'react-highlight-words';
// import XLSX from 'xlsx'
import UserApi from '../../../api/userManage'

class UserList extends Component{
    state={
        searchText:'',
        searchedColumn:'',
        page:1,
        pageSize:6,
        count:1,
        data:[]
    }
    getUserData = async()=>{
        let {page,pageSize} =this.state
        let {list,msg,err,allCount} =await UserApi.userQuery(page,pageSize)
        if(err !==0){ return message.error(msg)}
        let result=list.map((item,index)=>{
            return {
                key:index+1,
                _id:item._id,
                name:item.user,
                avator:item.avator||'',
                identity:item.leavel === 'root'?'超级管理员':'会员',
                handle:''
            }
        })
        this.setState({data:result,count:allCount})
    }
    componentDidMount(){
        this.getUserData()
    }
    delUser=async (_id,identity)=>{
        if(identity==='超级管理员'){
            return false
        }
        let result=await UserApi.userDel(_id)
        console.log(result)
    }
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              搜索
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              重置
            </Button>
          </div>
        ),
        filterIcon: filtered => (
          <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
        render: text =>
          this.state.searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[this.state.searchText]}
              autoEscape
              textToHighlight={text.toString()}
            />
          ) : (
            text
          ),
      });
    
      handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
          searchText: selectedKeys[0],
          searchedColumn: dataIndex,
        });
      };
    
      handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
      };
    
    render(){
        const  columns=[
            {
                title: 'ID',
                dataIndex: '_id',
                key: '_id',
                width: 250,
                fixed:'left',
                ...this.getColumnSearchProps('_id'),
              },
              {
                title: '用户',
                dataIndex: 'name',
                key: 'name',
                width: 250,
                ...this.getColumnSearchProps('name'),
              },
              {
                title: '头像',
                dataIndex: 'avator',
                key: 'avator',
                width: 150,
                //图片路径
                render:(avator)=>{
                    return (
                        <img  src={avator} alt='暂无图片' />
                    )
                }
              },
              {
                title: '身份',
                dataIndex: 'identity',
                key: 'identity',
                width:150,
                ...this.getColumnSearchProps('identity'),
              },
              {
                title: '操作',
                dataIndex: 'handle',
                key: 'handle',
                width:250,
                fixed:'right',
                render:(text, record, index)=>{
                    return(
                    <div>
                    <Popconfirm title='你确定要删除该用户吗?' onConfirm={()=>{
                        this.delUser(record._id,record.identity)
                    }}>
                    <Button type='danger' size='small'>删除此用户
                    </Button>
                    </Popconfirm>
                    </div>
                    )
                }
              }
        ]
        return(
            <div className={style.box}>
            <Card title='小鸡词典用户' className={style.card}>
            <Table columns={columns} dataSource={this.state.data} 
            scroll={{x:'max-content'}} rowKey='_id' pagination={false}
            />
            <Pagination current={this.state.page} total={this.state.count} showQuickJumper pageSize={this.state.pageSize}
            onChange={(page,pageSize)=>{
                console.log('跳转')
            }}
            />
            </Card>

            </div>
        )
    }
}

export default UserList;