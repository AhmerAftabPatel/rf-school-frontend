import React, { FC, useEffect, useState } from 'react';
import { Accordion, Button, Card, Divider, Form, Header, Icon, Image, Label, Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import moment from 'moment';
import { useRouter } from 'next/router';
import axios from 'axios';
import { API, s3_url } from '@/../constants';
import PreviewModal from './preview';
interface IProps {
  id: string;
}

/**
 * @author
 * @function @AdminHome
 **/

const Folder = ({ id }) => {
  const history = useRouter();
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState('');
  const [folder, setFolder] = useState({
    media: [],
    name: '',
    description: '',
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

  useEffect(() => {
    if (id) {
      preload(id);
    }
  }, [id]);
  const onOpen = (image) => {
    setImage(image);
    setOpen(true);
  };
  const onClose = (image) => {
    setImage('');
    setOpen(false);
  };
  const OpenModal = (
    <>
      <PreviewModal open={open} setOpen={setOpen}>
        <Image src={image} style={{ height: '600px', width: '150%' }} />
      </PreviewModal>
    </>
  );

  return (
    <StyledContainer>
      {OpenModal}
      <Card.Group itemsPerRow={5} stackable>
        {folder.media.map((media, index) => {
          return (
            <Card
              // centered
              key={index}
              style={{ textAlign: 'center', height: '200px', overflow: 'hidden',border : "none",boxShadow : "none" }}
              image
              onClick={() => onOpen(s3_url + media.replace(' ', '+'))}
            >
              <Image key={index} src={s3_url + media.replace(' ', '+')} style ={{minHeight: '200px'}}  />
            </Card>
          );
        })}
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
    // padding: 50px 100px;
    display: flex;
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
export default Folder;
