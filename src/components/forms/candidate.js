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

const Category = ['Faculty', 'Staff'];

const CandidateApply = ({ job }) => {
  const { _id: job_id, title :jobTitle } = job;
  const [candidate, setCandidate] = useState({
    full_name: '',
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
    resume: '',
    job_id: '',
    current_salary: '',
    total_experience: '',
    position_applied_for: '',
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { full_name, DoB, first_language, nationality, address } = candidate;

  const handleChange = (name) => (e) => {
    let target = e.target.value;
    if (name === 'full_name') {
      target = target.toUpperCase();
    }
    setCandidate({ ...candidate, [name]: target });
  };

  const handleChangAddress = (name) => (e) => {
    setCandidate({ ...candidate, address: { ...address, [name]: e.target.value } });
  };

  const onSubmit = () => {
    // alert('Admissions form not yet integrated, thank you for your patience...');
    if (isValid()) {
      setLoading(true);
      const formData = new FormData();
      for (var key in candidate) {
        formData.set(key, candidate[key]);
      }
      formData.set('job_id', job_id);

      formData.set('address', JSON.stringify(address));
      axios
        .post(`${API}/candidate`, formData)
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

  const handleResumeChange = (e) => {
    setCandidate({ ...candidate, resume: e.target.files[0] });
  };

  const handleRadio = (name, value) => {
    console.log(value, name);
    setAdmission({ ...candidate, [name]: value });
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
            label="Full Name"
            value={full_name}
            placeholder="Full name"
            onChange={handleChange('full_name')}
          />
          <Form.Input
            fluid
            required={true}
            label="Telephone Number"
            type="number"
            value={candidate.phone_number}
            placeholder="Enter Telephone Number"
            onChange={handleChange('phone_number')}
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Input
            fluid
            required={true}
            label="Email"
            type="email"
            value={candidate.email}
            placeholder="Enter email address"
            onChange={handleChange('email')}
          />
          <Form.Field required={true}>
            <label>Upload Resume (pdf, docx, doc)</label>
            <input type="file" name="resume" onChange={handleResumeChange} />
          </Form.Field>
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Input
            label="Currect Salary"
            type="text"
            value={candidate.current_salary}
            placeholder="Enter Your Currect Salary..."
            onChange={handleChange('current_salary')}
          />
          <Form.Input
            label="Total Experience in Months"
            type="text"
            value={candidate.total_experience}
            placeholder="Enter Your Total Experience in Months..."
            onChange={handleChange('total_experience')}
          />
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Input label="Position Applying for" type="text" onChange={handleChange("position_applied_for")} value={jobTitle} />
          <Form.Field></Form.Field>
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
            value={candidate.message}
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

export default CandidateApply;
