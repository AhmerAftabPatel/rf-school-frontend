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

const Admission = (props) => {
  const [admission, setAdmission] = useState({
    full_name: '',
    DoB: '',
    first_language: '',
    address: {
      street_address_1: '',
      street_address_2: '',
      city: '',
      state: '',
      zip_code: '',
      country: '',
    },
    phone_number: '',
    message: '',
    email: '',
    father_name: '',
    mother_name: '',
    nationality: '',
    prev_school_name: '',
    prev_school_class: '',
    admission_required: '',
    bus_required: 'false',
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { full_name, DoB, first_language, nationality, address } = admission;

  const handleChange = (name) => (e) => {
    let target = e.target.value;
    if (name === 'full_name') {
      target = target.toUpperCase();
    }
    setAdmission({ ...admission, [name]: target });
  };

  const handleChangAddress = (name) => (e) => {
    setAdmission({ ...admission, address: { ...address, [name]: e.target.value } });
  };

  const onSubmit = () => {
    // alert('Admissions form not yet integrated, thank you for your patience...');
    if (isValid()) {
      setLoading(true);
      const formData = new FormData();
      for (var key in admission) {
        formData.set(key, admission[key]);
      }

      formData.set('address', JSON.stringify(address));
      axios
        .post(`${API}/admission`, formData)
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
    if (!full_name) {
      alert('First Name is required');
      return false;
    }

    return true;
  };

  const handleRadio = (name, value) => {
    console.log(value, name);
    setAdmission({ ...admission, [name]: value });
  };

  return (
    <div className={tw('py-4')}>
      <div>{success && <p>Form Submitted</p>}</div>
      <div>{error && <p>Something Unexpected happened</p>}</div>
      <Form loading={loading} success={success} error={error} onSubmit={onSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            required={true}
            label="Student's Full Name (In Block Letters)"
            value={full_name}
            placeholder="Full name"
            onChange={handleChange('full_name')}
          />
          <Form.Field>
            <label htmlFor="start">Date of Birth:</label>

            <input
              type="date"
              id="start"
              name="trip-start"
              value={DoB}
              min="2000-01-01"
              max="2035-12-31"
              onChange={handleChange('DoB')}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            required={true}
            label="First Language"
            type="text"
            value={first_language}
            placeholder="eg : Urdu"
            onChange={handleChange('first_language')}
          />
          <Form.Input
            fluid
            required={true}
            label="Nationality"
            type="text"
            value={nationality}
            placeholder="Eg : Indian"
            onChange={handleChange('nationality')}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            required={false}
            label="Previous School Name"
            type="text"
            value={admission.prev_school_name}
            placeholder="Previous School Name"
            onChange={handleChange('prev_school_name')}
          />
          <Form.Input
            fluid
            required={false}
            label="Previous School Class"
            type="text"
            value={admission.prev_school_class}
            placeholder="Previous School Class"
            onChange={handleChange('prev_school_class')}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            required={false}
            label="Father's Name"
            type="text"
            value={admission.father_name}
            placeholder="Father's Name"
            onChange={handleChange('father_name')}
          />
          <Form.Input
            fluid
            required={false}
            label="Mothers's Name"
            type="text"
            value={admission.mother_name}
            placeholder="Mothers's Name"
            onChange={handleChange('mother_name')}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            required={true}
            label="Admission Required In"
            type="text"
            value={admission.admission_required}
            placeholder="eg : 5th Class"
            onChange={handleChange('admission_required')}
          />
          <Form.Input
            fluid
            required={true}
            label="Telephone Number"
            type="number"
            value={admission.phone_number}
            placeholder="Enter Telephone Number"
            onChange={handleChange('phone_number')}
          />
        </Form.Group>
        <Form.Group widths="equal">
        <Form.Input
            fluid
            required={true}
            label="Email"
            type="number"
            value={admission.email}
            placeholder="Enter email address"
            onChange={handleChange('email')}
          />
          <Form.Field>
            <Label>Bus Facility Required</Label>
            <Form.Radio
              value={admission.bus_required}
              label="Yes"
              checked={admission.bus_required ? true : false}
              onChange={(e) => handleRadio('bus_required', true)}
            />
            <Form.Radio
              value={admission.bus_required}
              label="No"
              checked={admission.bus_required ? false : true}
              onChange={(e) => handleRadio('bus_required', false)}
            />
          </Form.Field>
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
          <Form.TextArea
            fluid
            required={false}
            label="Anything that you would like us to know?"
            type="text"
            value={admission.message}
            placeholder="Start typing here..."
            onChange={handleChange('message')}
          />
        </Form.Group>
        {/* <Form.Checkbox label="I agree to the Terms and Conditions" /> */}
        <ThemeButton>Submit</ThemeButton>
      </Form>
    </div>
  );
};

export default Admission;
