import { API } from '@/../constants';
import axios from 'axios';
import React, { useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { authenticate } from '../../../helpers/auth';
import BaseHeading from '@/base/BaseHeader';
import ThemeButton from '@/base/Button';
const ForgetPasswordForm = () => {
  const history = useRouter();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };
  const onSubmit = () => {
    axios
      .post(`${API}/forget-password`, values)
      .then((res) => {
        console.log(res);
        alert("Please click on the verification link sent to your email address.");
      })
      .catch((err) => {
        console.log(err);
        alert(err?.response?.data?.error)
      });
  };
  return (
    <>
      <br />
      <br />
      <br />
      <BaseHeading Heading='Forgot Password' size='small'/>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <label>Email</label>
          <input placeholder="Password" type="email" onChange={handleChange('email')} required/>
        </Form.Field>
        <ThemeButton>Submit</ThemeButton>
      </Form>
    </>
  );
};

export default ForgetPasswordForm;
