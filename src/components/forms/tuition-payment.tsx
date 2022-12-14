import { API } from '@/../constants';
import ThemeButton from '@/base/Button';
import axios from 'axios';
import React, { FC, useState } from 'react';
import { Checkbox, Form, Label } from 'semantic-ui-react';
import { tw } from 'twind';
import styled from 'styled-components';
/**
 * @author
 * @function @Conatctus
 **/

const Payment_Types = [
  { title: 'DONATE', value: 'DONATE', text: 'Donation' },
  { title: 'TUITION', value: 'TUITION', text: 'Tuition Payment' },
];

const Tuition = ({ type, submit }) => {
  const [values, setValues] = useState({
    full_name: 'Ahmer Aftab',
    student_name: 'Shadab',
    address: {
      street_address_1: 'swdecrfvg',
      street_address_2: '',
      city: 'Hyderabad',
      state: 'Telangana',
      zip_code: '500048',
      country: 'India',
    },
    phone_number: '8106938402',
    message: 'This payment if for a random student',
    email: 'ahmerpatel123@gmail.com',
    type_of_payment: type,
    amount: 10,
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { full_name, address, student_name } = values;

  const handleChange = (name) => (e) => {
    let target = e.target.value;
    if (name === 'full_name') {
      target = target.toUpperCase();
    }
    setValues({ ...values, [name]: target });
  };

  const handleChangAddress = (name) => (e) => {
    setValues({ ...values, address: { ...address, [name]: e.target.value } });
  };

  const onSubmit = () => {
    // alert('Admissions form not yet integrated, thank you for your patience...');
    if (isValid()) {
      setLoading(true);
      submit(values,() => {
        setLoading(false);
      });
    }
  };

  const isValid = () => {
    if (!full_name) {
      alert('First Name is required');
      return false;
    }

    return true;
  };

  const handleRadio = (name, value) => {
    console.log(value, name);
    setValues({ ...values, [name]: value });
  };

  return (
    <StyledCard className={tw('py-4')}>
      <div>{success && <p>Form Submitted</p>}</div>
      <div>{error && <p>Something Unexpected happened</p>}</div>
      <Form loading={loading} success={success} error={error} onSubmit={onSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            required={true}
            label="Full Name (In Block Letters)"
            value={full_name}
            placeholder="Full name"
            onChange={handleChange('full_name')}
          />
          <Form.Input
            fluid
            required={true}
            label="Student's Full Name (In Block Letters)"
            value={student_name}
            placeholder="Student's Full Name"
            onChange={handleChange('student_name')}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            required={true}
            label="Email"
            type="email"
            value={values.email}
            placeholder="Enter email address"
            onChange={handleChange('email')}
          />
          <Form.Input
            fluid
            required={true}
            label="Telephone Number"
            type="number"
            value={values.phone_number}
            placeholder="Enter Telephone Number"
            onChange={handleChange('phone_number')}
          />
        </Form.Group>
        <Form.TextArea
          required={true}
          label="Street Address"
          value={address.street_address_1}
          placeholder="Enter Your address..."
          onChange={handleChangAddress('street_address_1')}
        />
        {/* </Form.Group> */}

        <Form.Group widths={2}>
          <Form.Input
            label="City"
            type="text"
            value={address.city}
            placeholder="Enter Your city..."
            onChange={handleChangAddress('city')}
          />
          <Form.Input
            label="State/ Province"
            type="text"
            value={address.state}
            placeholder="Enter Your city..."
            onChange={handleChangAddress('state')}
          />
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Input
            label="Postal Code"
            type="text"
            value={address.zip_code}
            placeholder="Enter Your city..."
            onChange={handleChangAddress('zip_code')}
          />
          <Form.Input
            label="Country"
            type="text"
            value={address.country}
            placeholder="Enter Your country..."
            onChange={handleChangAddress('country')}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Dropdown fluid selection options={Payment_Types} label="Payment Type" defaultValue={type} />
          <Form.Input
            fluid
            required={true}
            label="Enter Amount"
            type="number"
            value={values.amount}
            placeholder="Enter Amount"
            onChange={handleChange('amount')}
          />
        </Form.Group>
        <Form.TextArea
          fluid
          required={false}
          label="Enter Student Information"
          type="text"
          value={values.message}
          placeholder="Start typing here..."
          onChange={handleChange('message')}
        />
        <ThemeButton>Pay Now</ThemeButton>
      </Form>
    </StyledCard>
  );
};

const StyledCard = styled.div`
   {
    padding: 14px;
    margin: 14px;
    border: 5px;
    width: 900px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;
  }
`;
export default Tuition;
