import { API } from '@/../constants';
import ThemeButton from '@/base/Button';
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});
import 'react-quill/dist/quill.snow.css';
import { Form } from 'semantic-ui-react';
import { tw } from 'twind';

/**
 * @author
 * @function @Conatctus
 **/

const CategoryOptions = [
  { text: 'Faculty', value: 'Faculty' },
  { text: 'Staff', value: 'Staff' },
];
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const StatusOptions = [
  { text: 'On', value: true },
  { text: 'Off', value: false },
];
const POstJob = ({ onFinish, job_pre }) => {
  const [job, setJob] = useState({
    title: '',
    description: '',
    category: '',
    status: 'true',
  });

  // const [newDesc,setNewValues] = useState({
  //   title: '',
  //   description: '',
  //   category: '',
  // })
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { title, description, category, status } = job;

  const handleChange = (name) => (e) => {
    setJob({ ...job, [name]: e.target.value });
  };

  const onSubmit = () => {
    setLoading(true);
    if (job.job_id) {
      axios
        .put(`${API}/job`, job)
        .then((res) => {
          setSuccess(true);
          setLoading(false);
          onFinish();
        })
        .catch((err) => {
          setError(true);
          setLoading(false);
        });
    } else {
      axios
        .post(`${API}/job`, job)
        .then((res) => {
          setSuccess(true);
          setLoading(false);
          onFinish();
        })
        .catch((err) => {
          setError(true);
          setLoading(false);
        });
    }
  };

  const onDescriptionChange = (value) => {
    setJob({ ...job, description: value });
  };

  const preload = (job) => {
    console.log(job, 'swswsws');
    setJob({
      title: job.title,
      description: job.description,
      category: job.category,
      status: job?.status,
      job_id: job._id,
    });
  };

  useEffect(() => {
    if (job_pre) {
      preload(job_pre);
    }
  }, [job_pre]);

  return (
    <div style={{ height: '600px', overflow: 'auto' }} className={tw('p-4')}>
      <div>{success && <p>Form Submitted</p>}</div>
      <div>{error && <p>Something Unexpected happened</p>}</div>
      <Form loading={loading} success={success} error={error} onSubmit={onSubmit}>
        <Form.Group widths="equal">
          {
            <Form.Input
              fluid
              label="Title"
              type="text"
              required={true}
              value={title}
              placeholder="Enter Job Title"
              onChange={handleChange('title')}
            />
          }

          <Form.Dropdown
            fluid
            label="Category"
            options={CategoryOptions}
            value={category}
            selection
            required={true}
            placeholder="Select Job Category"
            onChange={(e, data) => setJob({ ...job, category: data.value })}
          />
        </Form.Group>
        <Form.Dropdown
          fluid
          label="Job Status"
          options={StatusOptions}
          value={status}
          selection
          required={true}
          placeholder="Select Job Status"
          onChange={(e, data) => setJob({ ...job, status: data.value })}
        />
        <Form.Group widths="equal">
          {/* <Form.Input
            fluid
            label="Job Description"
            value={description}
            required={true}
            placeholder="Description"
            onChange={handleChange('description')}
          /> */}

          <ReactQuill
            placeholder="Copy + Paste or Type your Content here"
            formats={formats}
            modules={modules}
            value={description}
            onChange={(value) => onDescriptionChange(value)}
            theme="snow"
          />
        </Form.Group>

        <br />
        <br />
        <br />
        <br />
        {/* <Form.Checkbox label="I agree to the Terms and Conditions" /> */}
        <ThemeButton>Submit</ThemeButton>
      </Form>
    </div>
  );
};

export default POstJob;
