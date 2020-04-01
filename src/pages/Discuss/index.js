import React from 'react'
import { Component } from 'react'
import { Card, Table, Button, Popconfirm, message, Modal, Form, Input } from 'antd'
import disFirst from '../../api/dicFirst'
import dicmanage from '../../api/dicmanage'
import LazyLoad from 'react-lazyload';

class Discuss extends Component {
    state = {
        img:'',
        dataSource: [],
        page: 1,
        pageSize: 20,
        visible: false,
        columns: [
            { title: '主词条id', dataIndex: 'from_id', key: 'from_id' },
            { title: '评论者', dataIndex: 'name', key: 'name' },
            { title: '评论内容', dataIndex: 'desc', key: 'desc' },
            { title: '头像', dataIndex: 'img', key: 'img',render:(img)=>{
                return (
                    <LazyLoad width={120}>
                        <img src={img} style={{width:'120px'}} alt="缩略图"/>
                    </LazyLoad>
                )
            } },
            { title: '创建时间', dataIndex: 'ctime', key: 'ctime' },
            {
                title: '操作', key: 'action', render: (recode) => {
                    return (
                        <div>
                            <Popconfirm title='您确定要删除该评论吗？'
                                onCancel={() => {
                                    message.error('取消删除')
                                }}
                                onConfirm={() => {
                                    console.log(recode.from_id)
                                    this.del(recode.from_id)
                                }}
                            >
                                <Button type='danger' size='small'>删除</Button>
                            </Popconfirm>
                            <Popconfirm title='您确定要修改该评论吗？'
                                onCancel={() => {
                                    message.error('取消修改')
                                }}
                                onConfirm={() => {
                                    message.error('权限不够')
                                }}
                            >
                                <Button type='primary' size='small' style={{ margin: '0 10px' }}>编辑</Button>
                            </Popconfirm>

                        </div>
                    )
                }
            }
        ]
    }
    del = (id) => {
        disFirst.delFirst(id).then((res) => {
            console.log(res)
            let { page, pageSize } = this.state
            if (res.err === 0) {
                this.refersh(page, pageSize)
            }
        })
    }

    upload=async ()=>{
        let file = this.refs.img.files[0]
        if(!file){return message.error('请先选择一张图片')}
        let {size,type} = file
        console.log(type)
        let types = ['jpg',"jpeg",'gif','png']
        if(size>1000000){return message.warning('图片超过1M')}
        if(types.indexOf(type.split('/')[1])===-1){return message.warning('只允许jpg.jpeg,gif,png四种类型')}
        let data = new FormData()
        data.append('hehe',file)
        let {code,msg,path} = await dicmanage.img(data)
        if(code){
            return message.error(msg)
        }
        this.setState({img:'http://39.99.195.178:3000'+path})
    }
    refersh = (page, pageSize) => {
        console.log(page, pageSize)
        disFirst.findFirst({ page, pageSize }).then((res) => {
            console.log(res)
            this.setState({ dataSource: res.list.result })
        })
    }
    componentDidMount() {
        let { page, pageSize } = this.state
        this.refersh(page, pageSize)
    }
    addDiscuss = () => {
        let { validateFieldsAndScroll } = this.props.form
        this.setState({ visible: true })
        validateFieldsAndScroll((err, data) => {
            if (!err) {
                let { name, desc, img, from_id } = data
                let { page, pageSize } = this.state
                // let { leavel } = JSON.parse(localStorage.getItem('user'))
                disFirst.addFirst({ name, desc, img, from_id }).then((res) => {
                    console.log(res)
                    if (res.err === 0) {
                        this.setState({ visible: false })
                        this.refersh(page, pageSize)
                    } else {
                        message.error('权限不够，请重试')
                        this.setState({ visible: false })
                    }
                })

            } else {
                console.log(err)
            }
        })
    }
    render() {
        let { dataSource, columns, visible,img} = this.state
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        let { getFieldDecorator } = this.props.form
        return (
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Card title="评论管理" bordered={false} >
                    <div>
                        <Button type='primary' size='small' onClick={this.addDiscuss}>新增</Button>
                        {/* <Button type='primary' size='small' style={{margin:'0 0 15px 15px'}}>导出</Button> */}
                    </div>
                    <Table columns={columns}
                        dataSource={dataSource}
                        rowKey='_id'
                    >
                    </Table>
                    <Modal
                        title='新建'
                        visible={visible}
                        onCancel={() => {
                            this.setState({ visible: false })
                        }}
                        onOk={this.addDiscuss}
                    >
                        <Form
                            {...formItemLayout}
                        >
                            <Form.Item label='主词条id'>
                                {getFieldDecorator('from_id', {
                                    rules: [{
                                        required: true,
                                        message: '内容不能为空',
                                    }]
                                })(<Input />)
                                }
                            </Form.Item>
                            <Form.Item label='评论者'>
                                {getFieldDecorator('name', {
                                    rules: [{
                                        required: true,
                                        message: '内容不能为空',
                                    }]
                                })(<Input />)
                                }
                            </Form.Item>
                            <Form.Item label='内容'>
                                {getFieldDecorator('desc', {
                                    rules: [{
                                        required: true,
                                        message: '内容不能为空',
                                    }]
                                })(<Input />)
                                }
                            </Form.Item>
                            <Form.Item label='头像'>
                                {getFieldDecorator('img', {
                                    rules: [{
                                        required: true,
                                        message: '内容不能为空',
                                    }]
                                })(
                                    <div>
                                        <input type="file" ref='img' /> <Button onClick={this.upload}>上传</Button>
                                        <div>
                                            <img src={img} alt="" width='180px'/>
                                        </div>
                                    </div>
                                )
                                }
                            </Form.Item>
                        </Form>
                    </Modal>
                </Card>
            </div>
        )
    }
}


export default Form.create()(Discuss)