import React from 'react';
import { Formik, Field, Form } from 'formik';
import axiosWithAuth from '../utils/axiosWithAuth';

const loginPath = 'http://localhost:5000/api/login';

const Login = props => {
  const onLogin = ({ username, password }) => {
    axiosWithAuth()
      .post(loginPath, { username, password })
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        props.history.push('/bubbles');
      })
      .catch(error => {
        localStorage.clear();
        alert(error.response.data.message);
      });
  };
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={onLogin}
        render={() => (
          <Form className='login'>
            <Field name='username' type='text' placeholder='username' />
            <Field name='password' type='text' placeholder='password' />
            <input type='Submit' />
          </Form>
        )}
      />
    </>
  );
};

export default Login;
