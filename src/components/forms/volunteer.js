import { API } from '@/../constants';
import ThemeButton from '@/base/Button';
import axios from 'axios';
import React, { FC, useState } from 'react';
import { Checkbox, Form, Label } from 'semantic-ui-react';
import { tw } from 'twind';

/**
 * @author
 * @function @Conatctus
 **/

const Volunteer_areas = [
  'Special Events',
  'Annual day Events',
  'Daily Assembly',
  'Substitute Teacher',
  'Sports and Games',
  'Parent Teacher Organization(PTO)',
  'Put me where you need me to be',
];

const Volunteer = (props) => {
  const [volunteer, setVolunteer] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    message: '',
    address: {
      street_address_1: '',
      street_address_2: '',
      city: '',
      state: '',
      zip_code: '',
      country: '',
    },
    age: '',
    reference_from: '',
    company: false,
    company_name: '',
    company_members: '',
    company_media: '',
    volunteer_area: '',
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { first_name, last_name, email, phone_number, message, address, company, age, reference_from } = volunteer;

  const handleChange = (name) => (e) => {
    setVolunteer({ ...volunteer, [name]: e.target.value });
  };

  const handleChangAddress = (name) => (e) => {
    setVolunteer({ ...volunteer, address: { ...address, [name]: e.target.value } });
  };

  const onSubmit = () => {
    if (isValid()) {
      setLoading(true);
      const formData = new FormData();
      for (var key in volunteer) {
        formData.set(key, volunteer[key]);
      }

      formData.set('address', JSON.stringify(address));
      axios
        .post(`${API}/volunteer`, formData)
        .then((res) => {
          setSuccess(true);
          setLoading(false);
          alert('Hurray!! Form is Submitted, Someone from our team will contact you in then next 48hrs.');
        })
        .catch((err) => {
          setError(true);
          setLoading(false);
        });
    }
  };

  const isValid = () => {
    if (!first_name) {
      alert('First Name is required');
      return false;
    } else if (!last_name) {
      alert('Last Name is required');
      return false;
    } else if (!email) {
      alert('Email is required');
      return false;
    } else if (!phone_number) {
      alert('Phone Number is required is required');
      return false;
    } else if (!reference_from) {
      alert('Fields are missing');
      return false;
    } else if (!volunteer.volunteer_area) {
      alert('Volunteer Area is missing');
      return false;
    }

    return true;
  };

  const handleRadio = (name, value) => {
    console.log(value, name);
    setVolunteer({ ...volunteer, [name]: value });
  };

  console.log(volunteer.volunteer_area, 'volunteer.volunteer_area ');
  return (
    <div className={tw('p-4')}>
      <div>{success && <p>Form Submitted</p>}</div>
      <div>{error && <p>Something Unexpected happened</p>}</div>
      <Form loading={loading} success={success} error={error} onSubmit={onSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            required={true}
            label="First name"
            value={first_name}
            placeholder="First name"
            onChange={handleChange('first_name')}
          />
          <Form.Input
            fluid
            required={true}
            label="Last name"
            value={last_name}
            placeholder="Last name"
            onChange={handleChange('last_name')}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            required={true}
            label="Email"
            type="email"
            value={email}
            placeholder="Email"
            onChange={handleChange('email')}
          />
          <Form.Input
            fluid
            required={true}
            label="Phone Number"
            value={phone_number}
            type="number"
            placeholder="Phone Number"
            onChange={handleChange('phone_number')}
          />
        </Form.Group>
        {/* <Form.Group > */}
        <Form.TextArea
          required={true}
          label="Street Address"
          value={address.street_address_1}
          placeholder="Enter Your address..."
          onChange={handleChangAddress('street_address_1')}
        />
        {/* </Form.Group> */}
        {/* <Form.Group> */}
        <Form.TextArea
          label="Street Address Line 2"
          value={address.street_address_2}
          placeholder="Enter Your address..."
          onChange={handleChangAddress('street_address_2')}
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
        {/* <Form.Group>
          <Label>
            Are you over 18 <span style={{ color: 'red' }}>*</span>
          </Label>
          <Form.Radio label="Yes" checked={age ? true : false} onChange={(e) => handleRadio('age', true)} />
          <Form.Radio label="No" checked={age ? false : true} onChange={(e) => handleRadio('age', false)} />
        </Form.Group> */}
        {/* <Form.TextArea
          required={true}
          label="Where did you hear about us"
          value={reference_from}
          onChange={handleChange('reference_from')}
        /> */}
        {/* <Form.Group>
          <Label>
            Is your company/Organization/Group Volunteering <span style={{ color: 'red' }}>*</span>
          </Label>
          <Form.Radio
            required={true}
            label="Yes"
            checked={company === true}
            onChange={(e) => handleRadio('company', true)}
          />
          <Form.Radio
            required={true}
            label="No"
            checked={company === false}
            onChange={(e) => handleRadio('company', false)}
          />
        </Form.Group> */}
        {/* <Form.Group>
          <Form.Input
            label="Company/Group/Origanizaion Name"
            value={volunteer.company_name}
            onChange={handleChange('company_name')}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            label="How many members are in your Company/Group/Origanizaion."
            value={volunteer.company_members}
            onChange={handleChange('company_members')}
          />
        </Form.Group> */}
        {/* <Form.Group> */}
        <Label>Preferred Area to Volunteer.</Label>
        <br />
        <br />
        {Volunteer_areas.map((volunt, index) => {
          return (
            <div>
              <Checkbox
                label={{ children: volunt }}
                checked={volunteer.volunteer_area === volunt ? true : false}
                value={volunt}
                onChange={(e, data) => handleRadio('volunteer_area', data.value)}
              />
              {/* &nbsp; */}
            </div>
          );
        })}
        {/* <Checkbox
          label={{ children: 'Gate/Door' }}
          checked={volunteer.volunteer_area === 'Gate/Door' ? true : false}
          value="Gate/Door"
          onChange={(e, data) => handleRadio('volunteer_area', data.value)}
        />
        &nbsp;
        <Checkbox
          label={{ children: 'Retail/Sales' }}
          checked={volunteer.volunteer_area === 'Retail/Sales'}
          onChange={(e, data) => handleRadio('volunteer_area', data.value)}
          value="Retail/Sales"
        /> */}
        {/* &nbsp;
        <br />
        <br />
        <Checkbox
          label={{ children: 'Raffle Area' }}
          checked={volunteer.volunteer_area === 'Raffle Area'}
          onChange={(e, data) => handleRadio('volunteer_area', data.value)}
          value="Raffle Area"
        />
        &nbsp;
        <Checkbox
          label={{ children: 'Grounds' }}
          checked={volunteer.volunteer_area === 'Grounds'}
          value="Grounds"
          onChange={(e, data) => handleRadio('volunteer_area', data.value)}
        />
        &nbsp;
        <Checkbox
          label={{ children: 'Put me where you need me to be' }}
          checked={volunteer.volunteer_area === 'Put me where you need me to be'}
          onChange={(e, data) => handleRadio('volunteer_area', data.value)}
          value="Put me where you need me to be"
        />
        &nbsp; */}
        <br />
        {/* </Form.Group> */}
        <Form.TextArea
          label="Any special message you want Us to know"
          value={message}
          placeholder="Start typing here..."
          onChange={handleChange('message')}
        />
        {/* <Form.Checkbox label="I agree to the Terms and Conditions" /> */}
        <ThemeButton>Submit</ThemeButton>
      </Form>
    </div>
  );
};

export default Volunteer;
