import React, { Component, Fragment } from "react";
import { Form, Icon, Input, Button, Checkbox, message } from "antd";
import LoginApi from "../../api/login";
import style from "../Login/index.module.less";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      pass: ""
    };
  }
  login = async () => {
    let { getFieldsValue, validateFields } = this.props.form;
    // 校验输入的值
    validateFields((data, err) => {
      if (err) {
        // 输入错误
        message.error("输入有误，请重试！");
      } else {
        // 用户名和密码正确
        LoginApi.login(data).then(res => {
          if (res.code == 404) {
            message.error("用户名或密码错误，请重试！");
          } else {
            message.success("输入正确，正在跳转", 1, () => {
              this.props.history.replace("/admin");
            });
          }
        });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={style["login-box"]}>
        <div className={style["login-form"]}>
          {/*用户名*/}
          <Form.Item>
            {getFieldDecorator("user", {
              rules: [
                { required: true, message: "用户名必须填写!" },
                { max: 9, message: "用户名最大长度9位" },
                { min: 3, message: "用户名最小长度3位" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="账号"
              />
            )}
          </Form.Item>
          {/*密码*/}
          <Form.Item>
            {getFieldDecorator("pass", {
              rules: [
                { required: true, message: "密码必须填写!" },
                { max: 9, message: "密码最大长度9位" },
                { min: 3, message: "密码最小长度3位" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="密码"
              />
            )}
          </Form.Item>
          {/*记住我 忘记密码 提交*/}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={this.login}
              style={{width:'338px',marginBottom:'30px'}}
            >
              登录
            </Button><br />
            <Checkbox>记住账号</Checkbox>&nbsp;&nbsp;&nbsp;&nbsp;
            <a className="login-form-forgot" href="">
              忘记密码
            </a>&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="">现在注册</a>
          </Form.Item>
        </div>
      </div>
    );
  }
}

export default Form.create()(Login);
