import React from 'react'
import { Component } from 'react'
import { Card, Table } from 'antd'


const columns = [
    { title: '主词条', dataIndex: 'word', key: 'word' },
    { title: '评论者', dataIndex: 'discuss', key: 'discuss' },
    { title: '评论数', dataIndex: 'num', key: 'num' },
    { title: '点赞数', dataIndex: 'count', key: 'count' },
    { title: '一级评论', dataIndex: 'first', key: 'first' },

]

class Discuss extends Component {
    state = {
        dataSource: ''
    }
    render() {
        let { dataSource } = this.state
        return (
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Card title="评论管理" bordered={false} >
                    <Table columns={columns}
                        // expandedRowRender={recode=><p style={{margin:0}}>{recode.description}</p>}
                        dataSource={dataSource}
                    >

                    </Table>
                </Card>
            </div>
        )
    }
}


export default Discuss