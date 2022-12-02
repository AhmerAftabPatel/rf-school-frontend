import { API } from '@/../constants';
import BaseHeading from '@/base/BaseHeader';
import BreadcrumbSection from '@/base/Breadcrumb';
import HtmlDynamic from '@/base/htmlDynamic';
import EditBox from '@/components/admin/forms/editbox';
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { Accordion, Button, Card, Divider, Header, Icon, Image, Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import moment from 'moment';
import withAuth from '../../../helpers/withAuth'
interface IProps {}

/**
 * @author
 * @function @AdminHome
 **/

const AdminContacts = (props) => {
  const [contacts, setContacts] = useState([]);
  const preload = () => {
    axios
      .get(`${API}/contact`)
      .then((res) => {
        setContacts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <StyledContainer>
      {/* {activeIndex && editModal()} */}
      <Icon name="arrow left" color="blue" style={{ cursor: 'pointer' }} onClick={() => history.back()} />
      <div>
        <BaseHeading Heading="Contacts" size="large" />
      </div>

      {contacts.map((contact, index) => {
        return (
          <>
            <StyledContact key={index}>
              <div>{index + 1}. &nbsp;</div>
              <div>
                <StyledDate>{moment(contact.createdAt).format('Do-MMM-YYYY')}</StyledDate>
                <br />
                {contact.first_name} &nbsp; - &nbsp; {contact.last_name} &nbsp; - &nbsp; {contact.email} <br />
                {contact.message} <br /> <br />
              </div>
            </StyledContact>
            {/* <Divider /> */}
          </>
        );
      })}
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
    width: 100&;
    display: flex;
    flex-gap : 2;
    position: relative;
    border-bottom: 1px solid grey;
  }
`;

const StyledDate = styled.span`
   {
    color: grey;
  }
`;
export default withAuth(AdminContacts);
