import { API } from '@/../constants';
import ThemeButton from '@/base/Button';
import axios from 'axios';
import React, { FC, useState } from 'react';
import { Form } from 'semantic-ui-react';
import { tw } from 'twind';
interface IProps {}

/**
 * @author
 * @function @Conatctus
 **/

const ContactUs: FC<IProps> = (props) => {
  const [contact, setContact] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    message: '',
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { first_name, last_name, email,phone_number, message } = contact;

  const handleChange = (name) => (e) => {
    setContact({ ...contact, [name]: e.target.value });
  };

  const onSubmit = () => {
    setLoading(true);
    axios
      .post(`${API}/contact`, contact)
      .then((res) => {
        setSuccess(true);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  };

  return (
    <div className={tw('p-4')}>
      <div>{success && <p>Form Submitted</p>}</div>
      <div>{error && <p>Something Unexpected happened</p>}</div>
      <Form loading={loading} success={success} error={error} onSubmit={onSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="First name"
            value={first_name}
            placeholder="First name"
            onChange={handleChange('first_name')}
          />
          <Form.Input
            fluid
            label="Last name"
            value={last_name}
            placeholder="Last name"
            onChange={handleChange('last_name')}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input fluid label="Email" type='email' value={email} placeholder="Email" onChange={handleChange('email')} />{' '}
          <Form.Input
            fluid
            label="Phone Number"
            value={phone_number}
            type="number"
            placeholder="Phone Number"
            onChange={handleChange('phone_number')}
          />
        </Form.Group>
        <Form.TextArea
          label="Message"
          value={message}
          placeholder="Tell us more about you..."
          onChange={handleChange('message')}
        />
        {/* <Form.Checkbox label="I agree to the Terms and Conditions" /> */}
        <ThemeButton>Submit</ThemeButton>
      </Form>
    </div>
  );
};

export default ContactUs;
