import React, { FC, useEffect, useState } from 'react';
import {
  Accordion,
  Button,
  Card,
  Container,
  Divider,
  Form,
  Header,
  Icon,
  Image,
  Label,
  Modal,
} from 'semantic-ui-react';
import styled from 'styled-components';
import moment from 'moment';
import withAuth from '../../../../helpers/withAuth';
import { useRouter } from 'next/router';
import axios from 'axios';
import { API, s3_url } from '@/../constants';
import BaseHeading from '@/base/BaseHeader';
interface IProps {}

/**
 * @author
 * @function @AdminHome
 **/

const Folders = (props) => {
  const history = useRouter();
  const [folders, setFolders] = useState([]);
  const [values, setValues] = useState({
    name: '',
    description: '',
    _id: '',
    image_url: '',
  });
  console.log(history.query.type, 'history.query.type');
  const [open, setOpen] = useState(false);
  const preload = (type) => {
    axios
      .get(`${API}/folders?page=${type ? type : "Gallery"}`)
      .then((res) => {
        setFolders(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const deleteFolder = (id) => {
    if (confirm('Are you sure ? All the images will be deleted inside this folder.')) {
      axios
        .delete(`${API}/folder?folderId=${id}`)
        .then((res) => {
          alert('deleted');
          preload(history.query.type);
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  useEffect(() => {
    // if (history.query.type) {
      // preload(history.query.type);
    // }else {
      preload(history.query.type)
    // }
  }, [history.query.type]);

  const handleFileChange = (e) => {
    setValues({ ...values, image_url: e.target.files[0] });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };
  const onCloseModal = () => {
    setOpen(false);
    setValues({
      name: '',
      description: '',
      image_url: '',
      _id: '',
    });
  };
  const Add = () => {
    const formData = new FormData();
    // details.forEach((detail) => {s

    formData.set('page', history.query.type?.toString() ? history.query.type.toString() : 'Gallery');

    for (var key in values) {
      if (values[key]) {
        formData.set(key, values[key]);
      }
    }

    axios
      .post(`${API}/folder`, formData)
      .then((res) => {
        alert('Folder Added');
        onCloseModal();
        preload(history.query.type);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  const Edit = () => {
    const formData = new FormData();
    // details.forEach((detail) => {
    formData.set('folderId', values._id);
    for (var key in values) {
      formData.set(key, values[key]);
    }
    axios
      .put(`${API}/folder`, formData)
      .then((res) => {
        alert('Folder Editted');
        onCloseModal();
        preload(history.query.type);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  const Onsubmit = () => {
    if (values._id) {
      Edit();
    } else {
      Add();
    }
  };

  const ModelOpen = (
    <>
      <Modal open={open} closeIcon onClose={onCloseModal}>
        <Container style={{ padding: '12px' }}>
          <h1 style={{ textAlign: 'center' }}>Add/Edit Folder</h1>
          <Form>
            {/* <Form.Input label="name" value={values.name} onChange={handleChange('name')} /> */}
            <Form.Input label="description" value={values.description} onChange={handleChange('description')} />
            <Image
              src={
                typeof values.image_url === 'string' ? s3_url + values.image_url : URL.createObjectURL(values.image_url)
              }
            />
            <input type="file" name="image_url" onChange={handleFileChange} />
            <div style={{ display: 'flex' }}>
              <Button color="green" onClick={Onsubmit}>
                Save
              </Button>
              <Button color="red">Cancel</Button>
            </div>
          </Form>
        </Container>
      </Modal>
    </>
  );

  const onEditClick = (value) => {
    setValues(value);
    setOpen(true);
  };

  const onAddClick = () => {
    setOpen(true);
  };

  return (
    <StyledContainer>
      {ModelOpen}
      <Icon name="arrow left" color="blue" style={{ cursor: 'pointer' }} onClick={() => history.back()} />
      <div>
        <BaseHeading Heading="Gallery Folders" size="large" />
      </div>
      <Card.Group itemsPerRow={4}>
        {folders.map((folder, index) => {
          return (
            <Card style={{ textAlign: 'center' }}>
              <Image src={s3_url + folder.image_url} style={{ height: '200px' }} />
              {/* <Card.Header>{folder.name}</Card.Header> */}
              <Card.Description>{folder.description}</Card.Description>
              <Divider />
              <div style={{ display: 'flex', justifyContent: 'center', margin: '2px 0' }}>
                <Button size="small" color="grey" onClick={() => history.push(`/admin/gallery/folders/${folder._id}`)}>
                  View
                </Button>
                <Button size="small" color="green" onClick={() => onEditClick(folder)}>
                  Edit
                </Button>
                <Button size="small" color="red" onClick={() => deleteFolder(folder._id)}>
                  Delete
                </Button>
              </div>
            </Card>
          );
        })}
        <Card
          onClick={() => onAddClick()}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          Add Folder +
        </Card>
      </Card.Group>
    </StyledContainer>
  );
};

const StyledDiv = styled.div`{
    // background : ${(props) => (props.highlight ? 'grey' : '')};
    border : ${(props) => (props.highlight ? '1px solid blue' : '')};
    // margin : ${(props) => (props.highlight ? '12px' : '')};
    border-radius : 7px;
}`;

const StyledContainer = styled.div`
   {
    padding: 50px 100px;
  }
`;

const StyledLabel = styled.div`
   {
    padding: 12px;
  }
`;

const StyledSuccess = styled.div`
   {
    color: #ffffff;
    font-weight: bold;
    fonr-size: 18px;
    width: 100%;
    background: green;
    border: 1px solid green;
    padding: 4px 10px;
    border-radius: 7px;
  }
`;

const StyledError = styled.div`
   {
    color: #ffffff;
    font-weight: bold;
    fonr-size: 18px;
    width: 100%;
    background: red;
    border: 1px solid red;
    padding: 4px 10px;
    border-radius: 7px;
  }
`;

const StyledCard = styled(Card)`
  &&&&& {
    border-radius: 12px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const StyledContact = styled.div`
   {
    width: 100%;
    display: flex;
    justify-content: left;
    flex-gap: 2;
    position: relative;
    // border-bottom: 1px solid grey;
  }
`;

const Styledbutton = styled.div`
   {
    width: 100%;
    padding: 15px 10px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 12px;
    text-align: center;
    margin-top: 12px;
    cursor: pointer;

    :hover {
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }
  }
`;

const StyledEditContainer = styled.div`
   {
    display: flex;
    justify-content: left;
    padding: 15px;
    flex-direction: column;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
`;
export default withAuth(Folders);
