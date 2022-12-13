import { Icon, Table } from 'semantic-ui-react';
import styled from 'styled-components'
const PaymentsList = ({ payments }) => {
  return (
    <StyledDiv>
      <Table compact='very' size='small' celled collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell >Date</Table.HeaderCell>
            <Table.HeaderCell>Full Name</Table.HeaderCell>
            <Table.HeaderCell>Student Name</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Phone Number</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Transcation id</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Personal Message</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {payments &&
            payments.map((volunt, index) => {
              return (
                <Table.Row key={index} color={volunt.status === 'SUCCESS' ? 'green' : 'red'}>
                  <Table.Cell collapsing>{volunt.createdAt.slice(0,10)}</Table.Cell>
                  <Table.Cell collapsing>{volunt.full_name}</Table.Cell>
                  <Table.Cell>{volunt.student_name}</Table.Cell>
                  <Table.Cell>
                    {volunt?.details.address?.street_address_1 +
                      ',' +
                      volunt?.details.address?.city +
                      ',' +
                      volunt?.details.address?.state +
                      ',' +
                      volunt?.details.address?.zip_code +
                      ',' +
                      volunt?.details.address?.country}
                  </Table.Cell>
                  <Table.Cell>{volunt?.user_number}</Table.Cell>
                  <Table.Cell>{volunt?.user_email}</Table.Cell>
                  <Table.Cell>{volunt?.details?.transactionid}</Table.Cell>
                  <Table.Cell positive={volunt.status === 'SUCCESS'} negative ={volunt.status !== 'SUCCESS'}>{volunt?.status}</Table.Cell>
                  <Table.Cell collapsing>{volunt?.message}</Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`{
  margin : 0px;
}`

export default PaymentsList;
