import React, { FC, useEffect, useState } from 'react';
import { people } from '../../../strings/facultystring';
import { Image, Icon, Card, Form, Popup } from 'semantic-ui-react';
import styled from 'styled-components';
import axios from 'axios';
import { API, s3_url } from '@/../constants';
import Section from '@/base/Section';
import HtmlDynamic from '@/base/htmlDynamic';
interface IProps {
  edit: boolean;
  board: boolean;
}

/**
 * @author
 * @function @FacultyList
 **/

const typeOptions = [
  { key: 'Principal', value: 'Principal', label: 'Principal' },
  { key: 'Chairman', value: 'Chairman', label: 'Chairman' },
  { key: 'Director', value: 'Director', label: 'Director' },
  { key: 'Vice Chairman', value: 'Vice President', label: 'Vice President' },
  { key: 'President', value: 'President', label: 'President' },
  { key: 'Board Member', value: 'Board Member', label: 'Board Member' },
];

const FacultyList: FC<IProps> = ({ edit, board }) => {
  const [people, setPeople] = useState([]);
  const [heading, setHeading] = useState({ page: '', description: '', heading: '', banner: '', folder: '', flyer: '' });
  const [person, setPerson] = useState({
    FirstName: '',
    LastName: '',
    _id: '',
    designation: '',
    photo: '',
    phone: '',
    email: '',
    type: '',
    message: '',
    subjects: [],
    home: false,
  });
  const [open, setOpen] = useState(false);
  const preload = () => {
    axios
      .get(`${API}/people`)
      .then((res) => {
        setPeople(res.data.people);
        setHeading(res.data.heading);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    preload();
  }, []);

  const OnEditClick = (values) => {
    if (values) {
      setPerson(values);
      window.scroll(0, 1000);
    } else {
      setPerson({
        FirstName: '',
        _id: '',
        LastName: '',
        designation: '',
        photo: '',
        phone: '',
        email: '',
        type: '',
        message: '',
        subjects: [],
        home: false,
      });
    }
    setOpen(true);
  };

  const handleChange = (name) => (e) => {
    if (name === 'photo') {
      setPerson({ ...person, [name]: e.target.files[0] });
    } else {
      setPerson({ ...person, [name]: e.target.value });
    }
  };

  const Submit = () => {
    const formData = new FormData();
    // details.forEach((detail) => {
    for (var key in person) {
      if (person[key]) {
        formData.set(key, person[key]);
      }
    }
    axios
      .post(`${API}/people`, formData)
      .then((res) => {
        alert(res.data);
        preload();
        setOpen(false);
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeDrop = (value) => {
    if (typeof value === 'string') {
      setPerson({ ...person, type: value });
    }
  };

  const toggelPerson = (id) => {
    axios
      .patch(`${API}/people/toggle?id=${id}`)
      .then((res) => {
        alert('Edited Successfully');
        preload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const EditBoxPeople = () => {
    return (
      <StyledForm>
        <h3 style={{ textAlign: 'center' }}>Add/Edit Person</h3>
        <Form>
          <Form.Group widths={3}>
            <Form.Input label="Photo" type="file" onChange={handleChange('photo')} />
            <Form.Input value={person.FirstName} label="FirstName" onChange={handleChange('FirstName')} />
            <Form.Input value={person.LastName} label="LastName" onChange={handleChange('LastName')} />
          </Form.Group>
          <Form.Group widths={3}>
            <Form.Input value={person.designation} label="Designation" onChange={handleChange('designation')} />
            <Form.Input value={person.phone} label="Phone" onChange={handleChange('phone')} />
            <Form.Input value={person.email} label="Email" onChange={handleChange('email')} />
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Dropdown
              value={person.type}
              label={`Type-${person.type && person.type}`}
              options={typeOptions}
              onChange={(e, data) => handleChangeDrop(data.value)}
            />
            <Form.TextArea value={person.message} label="message" onChange={handleChange('message')} />
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Button onClick={Submit}>Save</Form.Button>
            <Form.Button
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Form.Button>
          </Form.Group>
        </Form>
      </StyledForm>
    );
  };

  const deletePerson = (id) => {
    axios
      .delete(`${API}/people?id=${id}`)
      .then((res) => {
        console.log(res);
        alert('Person deleted!');
        preload();
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  return (
    <>
      {!board && <HtmlDynamic data={heading} />}
      <Card.Group itemsPerRow={4} stackable centered>
        {people.map((pep, index) => {
          if (
            edit
              ? true
              : board
              ? pep.type === 'Chairman' ||
                pep.type === 'Vice President' ||
                pep.type === 'Principal' ||
                pep.type === 'Board Member' ||
                pep.type === 'Director' ||
                pep.type === 'President'
              : !pep.type
          )
            return (
              <StyledCard as="div">
                <StyledDiv key={index}>
                  <div style={{ margin: '0 10px' }}>
                    <Image
                      size="small"
                      circular
                      style={{ width: '150px', height: '130px' }}
                      src={pep.photo ? `${s3_url + pep.photo}` : '/images/dummyprofile.png'}
                    />
                  </div>
                  <div>
                    <h3 style={{ margin: 0 }}>{pep.FirstName + ' ' + pep.LastName}</h3>
                    <span>{pep.type}</span>
                    <span style={{ fontStyle: 'italic', textDecoration: 'underline' }}>{pep.subjects[0]}</span> <br />
                    <Icon name="address card outline" /> {pep.designation}
                    <br />
                    <Icon name="phone" />
                    {pep.phone}
                    <br />
                    <Icon name="mail" />
                    {pep.email}
                  </div>
                  {edit && (
                    <>
                      <p onClick={() => OnEditClick(pep)}>edit</p> &nbsp;
                      <hr /> - &nbsp;
                      <Popup
                        trigger={
                          <p style={{ cursor: 'pointer' }} onClick={() => toggelPerson(pep._id)}>
                            <Icon name="home" color={pep.home ? 'green' : 'grey'} />
                          </p>
                        }
                        content={`${pep.home ? '' : 'Not '}Visible on home page`}
                      />
                      <Popup
                        trigger={
                          <p style={{ cursor: 'pointer' }} onClick={() => deletePerson(pep._id)}>
                            <Icon name="trash" color={'red'} />
                          </p>
                        }
                        content={`Delete`}
                      />
                    </>
                  )}
                </StyledDiv>
              </StyledCard>
            );
        })}
        {edit && (
          <StyledCard as="div" onClick={() => OnEditClick(null)}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                cursor: 'pointer',
              }}
            >
              Add New
            </div>
          </StyledCard>
        )}
      </Card.Group>
      {open && EditBoxPeople()}
    </>
  );
};

const StyledCard = styled(Card)`
  &&&&& {
    box-shadow: none;
    width: 450px;
    margin: 30px 12px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    padding: 12px;
    border-radius: 12px 15px;
  }
`;

const StyledDiv = styled.div`
   {
    display: flex;
  }
`;

const StyledForm = styled.div`
   {
    margin: 50px 100px;
    padding: 50px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
`;

export default FacultyList;
