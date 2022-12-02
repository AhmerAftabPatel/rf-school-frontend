import { API } from '@/../constants';
import axios from 'axios';
import React, { useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { authenticate } from '../../../helpers/auth';
import BaseHeading from '@/base/BaseHeader';
const FormExampleForm = () => {
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
      .post(`${API}/signin`, values)
      .then((res) => {
        authenticate(res.data, () => {
          history.push('/admin');
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <br />
      <br />
      <br />
      <BaseHeading Heading='Login as Admin' size='small'/>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <label>Email</label>
          <input placeholder="Email" type="email" onChange={handleChange('email')} required/>
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder="password" type="password" onChange={handleChange('password')} required/>
        </Form.Field>
        <Button type="submit">Sign In</Button>
      </Form>
    </>
  );
};

export default FormExampleForm;
