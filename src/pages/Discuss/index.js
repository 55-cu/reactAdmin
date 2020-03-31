import React from 'react'
import { Component } from 'react'
import { Card, Table } from 'antd'
import dicManage from '../../api/dicmanage'

const columns = [
    { title: '主词条id', dataIndex: '_id', key: '_id' },
    { title: '评论者', dataIndex: 'creator', key: 'creator' },
    { title: '评论内容', dataIndex: 'desc', key: 'desc' },
    { title: '头像', dataIndex: 'img', key: 'img' },
    { title: '创建时间', dataIndex: 'ctime', key: 'ctime' },
]

class Discuss extends Component {
    state = {
        dataSource: [],
        page: 1,
        pageSize: 10,
        newtime: ''
    }

    componentDidMount() {
        let { page, pageSize } = this.state
        dicManage.findByPage({ page, pageSize }).then((res) => {
            this.setState({ dataSource: res.list })
        })
    }
    render() {
        let { dataSource } = this.state
        return (
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Card title="评论管理" bordered={false} >
                    <Table columns={columns}
                        // expandedRowRender={recode=><p style={{margin:0}}>{recode.description}</p>}
                        dataSource={dataSource}
                        rowKey='_id'
                    >

                    </Table>
                </Card>
            </div>
        )
    }
}


export default Discuss