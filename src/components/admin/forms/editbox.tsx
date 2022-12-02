import React, { FC, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { Dropdown, Form, Image } from 'semantic-ui-react';
import styled from 'styled-components';
import BreadcrumbSection from '@/base/Breadcrumb';
import { s3_url } from '@/../constants';
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});
interface IProps {
  values: any;
  setValues: any;
  setNewValues: any;
  loading: boolean;
  newValues: any;
  type: string;
}

/**
 * @author
 * @function @EditBox
 **/
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
const EditBox: FC<IProps> = ({ values, setValues, loading, setNewValues, newValues, type }) => {
  const { banner, page, description, heading } = values;
  const { banner: newBanner, page: newPage, description: newDesc, heading: newHeading, photo: newPhoto,flyer } = newValues;

  const onDescriptionChange = (value: string) => {
    setNewValues({ ...newValues, description: value });
  };

  const handleChange = (e) => {
    setNewValues({ ...newValues, page: e.target.value });
  };
  const handleChangeImage = name => (e) => {
    setNewValues({ ...newValues, [name]: e.target.files[0] });
  };
console.log(values,"uhygtfr")
  return (
    <StyledDiv>
      <BreadcrumbSection
        sections={[
          { key: 0, content: newHeading ? newHeading : heading },
          { key: 1, content: page },
        ]}
      />
      <Form loading={loading}>
        <br />
        <h3 style={{ margin: '5px 0' }}>Add/Edit banner image</h3>
        {newValues && newPhoto ? (
          <Image src={newPhoto ? URL.createObjectURL(newPhoto) : '/images/dummyprofle'} size="tiny" />
        ) : (
          values.banner && (
            <Image src={values.banner ? s3_url + values.banner : '/images/dummyprofle'} size="tiny" />
          )
        )}

        <input type="file" onChange={handleChangeImage("photo")} />
        <br />
        <h3 style={{ margin: '5px 0' }}>Add/Edit Flyer</h3>
        {newValues && flyer ? (
          <Image src={flyer ? URL.createObjectURL(flyer) : '/images/dummyprofle'} size="tiny" />
        ) : (
          values && values.flyer && (
            <Image src={values.flyer ? s3_url + values.flyer.replace(" ","+") : '/images/dummyprofle'} size="tiny" />
          )
        )}

        <input type="file" onChange={handleChangeImage("flyer")} />
        <h3 style={{ margin: '5px 0' }}>Add/Edit Heading</h3>
        <Form.Input type="text" value={newPage ? newPage : page} width={6} onChange={handleChange} />
        <h3 style={{ margin: '5px 0' }}>Add/Edit Content</h3>
        {type && type === 'normal' ? (
          <textarea onChange={(e) => onDescriptionChange(e.target.value)} value={newDesc ? newDesc : description} />
        ) : (
          <ReactQuill
            placeholder="Copy + Paste or Type your Content here"
            formats={formats}
            modules={modules}
            value={newDesc ? newDesc : description}
            onChange={(value) => onDescriptionChange(value)}
            theme="snow"
          />
        )}
        <br />
        {/* </Form.Field> */}
        {/* <Dropdown
          placeholder="Page Type"
          selection
          onChange={(e, data) => setNewValues({ ...newValues, type: data.value })}
          options={[
            { key: 'DEFAULT', text: 'Default Page Layout', value: 'DEFAULT' },
            { key: 'POSTER', text: 'Flyer/Poster/Banner Layout', value: 'POSTER' },
          ]}
        /> */}
      </Form>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
   {
    padding: 0px;
  }
`;

export default EditBox;
