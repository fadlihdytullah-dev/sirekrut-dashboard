import * as React from 'react';
import {Form, Input, Button} from 'antd';
import styled from 'styled-components';
import Header from '../../components/commons/Header';
import AppHeader from '../../components/layouts/AppHeader';
import {useHistory} from 'react-router-dom';

type Props = {};

const LoginWrapper = styled.div`
  width: 500px;
  margin: 0 auto;
  padding-top: 100px;
`;

function Login(props: Props) {
  const history = useHistory();

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <React.Fragment>
      <AppHeader backLink="/login" center />
      <LoginWrapper>
        <Header title="Silahkan Login" />
        <Form
          name="basic"
          initialValues={{remember: true}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
          <Form.Item
            style={{display: 'block'}}
            label="Email"
            name="email"
            rules={[{required: true, message: 'Please input your email!'}]}>
            <Input />
          </Form.Item>

          <Form.Item
            style={{display: 'block'}}
            label="Password"
            name="password"
            rules={[{required: true, message: 'Please input your password!'}]}>
            <Input.Password />
          </Form.Item>

          <Button type="primary" block onClick={() => history.push('/')}>
            Submit
          </Button>
        </Form>
      </LoginWrapper>
    </React.Fragment>
  );
}

export default Login;
