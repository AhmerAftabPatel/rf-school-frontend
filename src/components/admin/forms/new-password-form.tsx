import { API } from '@/../constants';
import axios from 'axios';
import React, { useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { authenticate } from '../../../helpers/auth';
import BaseHeading from '@/base/BaseHeader';
import ThemeButton from '@/base/Button';
const NewPasswordForm = () => {
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
      .post(`${API}/new-password`, values)
      .then((res) => {
        console.log(res);
        alert("Your password has been reset, Please login to continue");
        history.push("/admin/Auth/login")
      })
      .catch((err) => {
        console.log(err);
        alert(err)
      });
  };
  return (
    <>
      <br />
      <br />
      <br />
      <BaseHeading Heading='New Password' size='small'/>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <label>New Password</label>
          <input placeholder="Password" type="password" onChange={handleChange('password')} required/>
        </Form.Field>
        <Form.Field>
          <label>Confirm New Password</label>
          <input placeholder="Confirm Password" type="password" onChange={handleChange('password2')} required/>
        </Form.Field>
        <ThemeButton>Submit</ThemeButton>
      </Form>
    </>
  );
};

export default NewPasswordForm;
