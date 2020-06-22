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
  const {dispatchApp} = React.useContext(AppContext);
  const [formData, setFormData] = React.useState(initFormData);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleLogin = async () => {
    try {
      setIsSubmitting(true);
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
      message.error('Username atau password salah');
      setIsSubmitting(false);
      dispatchApp({
        type: 'USER_LOGIN_FAILURE',
        payload: {error: error.message},
      });
    }
  };

  const handleChangeInput = (event) => {
    const name = event.target && event.target.name;
    const value = event.target && event.target.value;

    setFormData((state) => ({
      ...state,
      [name]: value,
    }));
  };

  return (
    <React.Fragment>
      <AppHeader backLink="/login" center />
      <LoginWrapper>
        <Header title="Silahkan Login" />
        <Form
          name="basic"
          initialValues={{remember: true}}
          onFinish={handleLogin}>
          <Form.Item
            style={{display: 'block'}}
            label="Email"
            name="email"
            rules={[{required: true, message: 'Email tidak boleh kosong'}]}>
            <Input name="email" onChange={handleChangeInput} />
          </Form.Item>

          <Form.Item
            style={{display: 'block'}}
            label="Password"
            name="password"
            rules={[{required: true, message: 'Password tidak boleh kosong'}]}>
            <Input.Password name="password" onChange={handleChangeInput} />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={isSubmitting}>
            Submit
          </Button>
        </Form>
      </LoginWrapper>
    </React.Fragment>
  );
}

export default Login;
