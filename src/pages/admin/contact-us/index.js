import { API } from '@/../constants';
import BaseHeading from '@/base/BaseHeader';
import BreadcrumbSection from '@/base/Breadcrumb';
import HtmlDynamic from '@/base/htmlDynamic';
import EditBox from '@/components/admin/forms/editbox';
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { Accordion, Button, Card, Divider, Header, Icon, Image, Modal, Pagination, Table } from 'semantic-ui-react';
import styled from 'styled-components';
import moment from 'moment';
import withAuth from '../../../helpers/withAuth';
import { useRouter } from 'next/router';

/**
 * @author
 * @function @AdminHome
 **/

const AdminContacts = (props) => {
  const history = useRouter();
  const [contacts, setContacts] = useState([]);
  const [total_pages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const preload = () => {
    axios
      .get(
        `${API}/contact?limit=${history.query.limit ? history.query.limit : '10'}&page=${
          history.query.page ? history.query.page : '1'
        }`,
      )
      .then((res) => {
        setContacts(res.data.contacts);
        setTotalPages(res.data.total_pages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDelete = (id) => {
    if(confirm("Are you sure?")){
    axios
      .delete(`${API}/contact?contactId=${id}`)
      .then((res) => {
        console.log(res);
        preload()
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
    }
  };
  const handlePaginationChange = (e, { activePage }) => {
    history.push({ query: { limit: 1, page: activePage } });
    setCurrentPage(activePage);
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
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={2}>Date</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Phone Number</Table.HeaderCell>
            <Table.HeaderCell>Message</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {contacts && contacts.map((contact, index) => {
            return (
              <>
                <Table.Row>
                  <Table.Cell>{contact?.createdAt.slice(0,10)}</Table.Cell>
                  <Table.Cell>{contact?.first_name + contact?.last_name}</Table.Cell>
                  <Table.Cell>{contact?.email}</Table.Cell>
                  <Table.Cell>{contact?.phone_number}</Table.Cell>
                  <Table.Cell>{contact?.message}</Table.Cell>
                  <Table.Cell>
                    <Icon name="trash" onClick={() => onDelete(contact._id)} />
                  </Table.Cell>
                  {/* <StyledContact key={index}> */}
                  {/* <div>{index + 1}. &nbsp;</div>
              <div>
                <StyledDate>{moment(contact.createdAt).format('Do-MMM-YYYY')}</StyledDate>
                <br />
                {contact.first_name} &nbsp; - &nbsp; {contact.last_name} &nbsp; - &nbsp; {contact.email} <br />
                {contact.message} <br /> <br />
              </div> */}
                  {/* </StyledContact> */}
                </Table.Row>
                {/* <Divider /> */}
              </>
            );
          })}
          {/* <Table.Row>
            <Table.Cell>No Name Specified</Table.Cell>
            <Table.Cell>Unknown</Table.Cell>
            <Table.Cell>None</Table.Cell>
          </Table.Row> */}
        </Table.Body>
      </Table>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Pagination
          activePage={currentPage}
          firstItem={null}
          lastItem={null}
          pointing
          secondary
          onPageChange={handlePaginationChange}
          totalPages={total_pages / (history.query.limit ? history.query.limit : 10)}
        />
      </div>
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
    flex-gap: 2;
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
