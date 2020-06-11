import * as React from 'react';
import {Form, Input, Button, message} from 'antd';
import styled from 'styled-components';
import Header from '../../components/commons/Header';
import AppHeader from '../../components/layouts/AppHeader';
import {useHistory} from 'react-router-dom';
import {AppContext} from '../../contexts/AppContext';
import {AUTH_API, config} from '../config';
import axios from 'axios';

type Props = {};

const LoginWrapper = styled.div`
  width: 500px;
  margin: 0 auto;
  padding-top: 100px;
`;

const initFormData = () => ({
  email: '',
  password: '',
});

function Login(props: Props) {
  const history = useHistory();
  const {appState, dispatchApp} = React.useContext(AppContext);
  const [formData, setFormData] = React.useState(initFormData);

  const handleLogin = async () => {
    try {
      dispatchApp({type: 'USER_LOGIN_INIT'});

      const URL = AUTH_API.login;
      const response = await axios.post(URL, formData);
      const result = response.data;
      if (result.success) {
        console.log(result.data, 'TRASDSADSADSAD');
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('isLogin', true);
        dispatchApp({
          type: 'USER_LOGIN_SUCCESS',
        });
        history.push('/');
      } else {
        throw new Error(result.errors);
      }
    } catch (error) {
      message.error(error.message);
      dispatchApp({
        type: 'USER_LOGIN_FAILURE',
        payload: {error: error.message},
      });
    }
  };
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const handleChangeInput = (event) => {
    const name = event.target && event.target.name;
    const value = event.target && event.target.value;

    setFormData((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <React.Fragment>
      <AppHeader backLink="/login" center />
      <LoginWrapper>
        <Header title="Silahkan Login" />
        <Form name="basic" initialValues={{remember: true}}>
          <Form.Item
            style={{display: 'block'}}
            label="Email"
            name="email"
            rules={[{required: true, message: 'Please input your email!'}]}>
            <Input name="email" onChange={handleChangeInput} />
          </Form.Item>

          <Form.Item
            style={{display: 'block'}}
            label="Password"
            name="password"
            rules={[{required: true, message: 'Please input your password!'}]}>
            <Input.Password name="password" onChange={handleChangeInput} />
          </Form.Item>

          <Button type="primary" block onClick={handleLogin}>
            Submit
          </Button>
        </Form>
      </LoginWrapper>
    </React.Fragment>
  );
}

export default Login;
