import { Icon, Table } from 'semantic-ui-react';

const VolunteerList = ({ volunteer }) => {
  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>First Name + Last Name</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Phone Number</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            {/* <Table.HeaderCell>Age 18+</Table.HeaderCell> */}
            {/* <Table.HeaderCell>Rf school reference</Table.HeaderCell> */}
            {/* <Table.HeaderCell>Company Name</Table.HeaderCell> */}
            {/* <Table.HeaderCell>Company Members</Table.HeaderCell> */}
            <Table.HeaderCell>Volunteer Area Selcted</Table.HeaderCell>
            <Table.HeaderCell>Personal Message</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {volunteer && volunteer.map((volunt, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>{volunt.first_name + ' ' + volunt.last_name}</Table.Cell>
                <Table.Cell>
                  {volunt.address?.street_address_1 +
                    ',' +
                    volunt.address?.city +
                    ',' +
                    volunt.address?.state +
                    ',' +
                    volunt.address?.zip_code +
                    ',' +
                    volunt.address?.country}
                </Table.Cell>
                <Table.Cell>{volunt?.phone_number}</Table.Cell>
                <Table.Cell>{volunt?.email}</Table.Cell>
                {/* <Table.Cell>{volunt?.age ? 'Yes' : 'No'}</Table.Cell> */}
                {/* <Table.Cell>{volunt?.reference_from}</Table.Cell> */}
                {/* <Table.Cell>{volunt?.company_name}</Table.Cell> */}
                {/* <Table.Cell>{volunt?.company_members}</Table.Cell> */}
                <Table.Cell>{volunt?.volunteer_area}</Table.Cell>
                <Table.Cell>{volunt?.message}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default VolunteerList;
