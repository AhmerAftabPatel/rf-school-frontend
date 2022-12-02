import React, { FC, useEffect, useState } from 'react';
import { Accordion, Button, Card, Divider, Form, Header, Icon, Image, Label, Modal } from 'semantic-ui-react';
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

const FoldersGallery = (props) => {
  const history = useRouter();
  if(props.id){
    history.query.id = '6373ce280eeb0102084131c2'
  }
  
  const [folder, setFolder] = useState({
    media: [],
    name: '',
    description : "",
    _id: '',
  });
  const preload = (id) => {
    axios
      .get(`${API}/folder?folderId=${id}`)
      .then((res) => {
        setFolder(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  const onDrag = (e) => {
    e.preventDefault();
  };
  const onDelete = (id: string, media: string) => {
    axios
      .delete(`${API}/folder?folderId=${id}&name=${media}`)
      .then((res) => {
        alert('deleted Successfully!');
        preload(history.query.id);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    if (history.query.id) {
      preload(history.query.id);
    }
  }, [history.query.id]);

  const onFileChange = (e) => {
    console.log(e.target.files.length, 'e.target.files');
    const formData = new FormData();
    // details.forEach((detail) => {
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append('image_url', e.target.files[i]);
    }
    formData.set('folderId', folder._id);
    axios
      .post(`${API}/folder/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        alert('Upload Success!');
        preload(folder._id);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <StyledContainer>
      <Icon name="arrow left" color="blue" style={{ cursor: 'pointer' }} onClick={() => history.back()} />
      <div>{<BaseHeading Heading={folder && folder.description} size="large" />}</div>
      <Card.Group itemsPerRow={4}>
        {folder.media.map((media, index) => {
          return (
            <Card key={index} style={{ textAlign: 'center' }}>
              <Image src={s3_url + media.replace(" ","+")} style ={{height :"200px"}}/>
              <Label attached="bottom right" color="red" icon onClick={() => onDelete(folder._id, media)}>
                <Icon name="trash" />
              </Label>
            </Card>
          );
        })}
        <label htmlFor="upload-button" style={{ cursor: 'pointer' }}>
          <Card
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              margin: '16px 0',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            Add +
          </Card>
        </label>
        <input
          multiple
          type="file"
          id="upload-button"
          style={{ display: 'none' }}
          name="image_url"
          onChange={onFileChange}
        />
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
export default withAuth(FoldersGallery);
