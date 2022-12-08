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
    email: '',
    nationality: '',
    prev_school_name: '',
    prev_school_class: '',
    admission_required: '',
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { full_name, DoB, first_language, nationality } = admission;

  const handleChange = (name) => (e) => {
    setAdmission({ ...admission, [name]: e.target.value });
  };

  //   const handleChangAddress = (name) => (e) => {
  //     setAdmission({ ...admission, address: { ...address, [name]: e.target.value } });
  //   };

  const onSubmit = () => {
    alert('Admissions form not yet integrated, thank you for your patience...');
    // if (isValid()) {
    //   setLoading(true);
    //   const formData = new FormData();
    //   for (var key in admission) {
    //     formData.set(key, admission[key]);
    //   }

    // //   formData.set('address', JSON.stringify(address));
    //   axios
    //     .post(`${API}/admission`, formData)
    //     .then((res) => {
    //       setSuccess(true);
    //       setLoading(false);
    //       alert('Hurray!! Form is Submitted, Someone from our team will contact you in then next 48hrs.');
    //     })
    //     .catch((err) => {
    //       setError(true);
    //       setLoading(false);
    //     });
    // }
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
            label="Full Name (In Block Letters)"
            value={full_name}
            placeholder="Full name"
            onChange={handleChange('full_name')}
          />
          <Form.Field>
            <label htmlFor="start">Start date:</label>

            <input type="date" id="start" name="trip-start" value={DoB} min="2018-01-01" max="2018-12-31" />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            required={true}
            label="First Language"
            type="text"
            value={first_language}
            placeholder="First Language"
            onChange={handleChange('first_language')}
          />
          <Form.Input
            fluid
            required={true}
            label="Nationality"
            type="text"
            value={nationality}
            placeholder="Nationality"
            onChange={handleChange('nationality')}
          />
        </Form.Group>
        {/* <Form.Checkbox label="I agree to the Terms and Conditions" /> */}
        <ThemeButton>Submit</ThemeButton>
      </Form>
    </div>
  );
};

export default Admission;
