import { API, s3_url } from '@/../constants';
import BaseHeading from '@/base/BaseHeader';
import BreadcrumbSection from '@/base/Breadcrumb';
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import withAuth from '../../../helpers/withAuth';
import { Button, Container, Form, Icon, List } from 'semantic-ui-react';
interface IProps {}

/**
 * @author
 * @function @AdminHome
 **/
const sections = [
  { key: 'Home', content: 'Home', link: true, href: '/admin' },
  { key: 'Announcements', content: 'Announcements', link: true },
];

const AdminAnnouncement = (props) => {
  const [items, setItems] = useState([]);
  const [New, setNew] = useState(false);
  const [values, setValues] = useState({
    text: '',
    toggle: false,
  });
  const preload = () => {
    axios
      .get(`${API}/announcements`)
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        alert('something unexpected happened');
      });
  };

  const onAddClick = () => {
    setNew(true);
    setValues({
      ...values,
      text: '',
      toggle: true,
    });
  };
  const ListItems = ({ item }) => {
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({
      text: '',
      toggle: false,
      announcement_id: '',
    });
    const EditClick = (value) => {
      setValues({
        announcement_id: value._id,
        toggle: value.toggle,
        text: value.text,
      });
      setOpen(!open);
    };

    const onSubmit = () => {
      axios
        .put(`${API}/announcement`, values)
        .then((res) => {
          console.log(res);
          alert('Edit Successfull!');
          preload();
          setOpen(false);
          setNew(false);
          setValues({ text: '', toggle: true, announcement_id: '' });
        })
        .catch((err) => {
          console.log(err);
          setOpen(false);
          setValues({ text: '', toggle: true, announcement_id: '' });
          alert(err);
        });
    };

    const onDeleteSubmit = (id: string) => {
      if (confirm('Are you sure?')) {
        axios
          .delete(`${API}/announcement?id=${id}`)
          .then((res) => {
            alert('deleted success!');
            preload();
          })
          .catch((err) => {
            console.log(err);
            alert(err);
          });
      }
    };

    const toggleClick = (value) => {
      setValues({
        announcement_id: value._id,
        toggle: !value.toggle,
        text: value.text,
      });
      setOpen(!open);
    };

    return (
      <List.Item>
        <List.Content floated="right">
          {open && <Button onClick={onSubmit}>Save</Button>}
          <Button onClick={() => EditClick(item)}>Edit</Button>
          <Button onClick={() => onDeleteSubmit(item._id)}>Delete</Button>
          <Button
            icon
            onClick={() => {
              toggleClick(item);
            }}
          >
            <Icon name={!open && item && item.toggle ? 'eye' : values.toggle ? 'eye' : 'eye slash'} />
          </Button>
        </List.Content>
        <List.Content>
          {open ? (
            <Form.Input
              fluid
              value={values.text}
              placeholder="Enter text..."
              onChange={(e) => setValues({ ...values, text: e.target.value })}
            />
          ) : (
            item.text
          )}
        </List.Content>
      </List.Item>
    );
  };

  useEffect(() => {
    preload();
  }, []);
  const onsubmit = () => {
    axios
      .post(`${API}/announcement`, values)
      .then((res) => {
        console.log(res.status);
        alert('Added Successfully!');
        preload();
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };
  return (
    <StyledContainer>
      <BreadcrumbSection sections={sections} />
      <BaseHeading size='large' Heading='Announcements'/>
      <br />
      <br />
      <br />
      <br />
      <Container fluid>
        <List divided celled>
          {items.map((item, index) => {
            return <ListItems item={item} key={index} />;
          })}
          {New && (
            <List.Item>
              <List.Content floated="right">
                <Button onClick={onsubmit}>Save</Button>
                <Button icon onClick={() => setValues({ ...values, toggle: !values.toggle })}>
                  <Icon name={values.toggle ? 'eye' : 'eye slash'} />
                </Button>
              </List.Content>
              <List.Content>
                <Form.Input
                  fluid
                  value={values.text}
                  placeholder="Enter text..."
                  onChange={(e) => setValues({ ...values, text: e.target.value })}
                />
              </List.Content>
            </List.Item>
          )}
        </List>
        <Button floated="right" onClick={onAddClick} color="green">
          Add
        </Button>
      </Container>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
   {
    padding: 50px 100px;
  }
`;

export default withAuth(AdminAnnouncement);
