import { Icon, Table } from 'semantic-ui-react';

const AdmissionsList = ({ admission }) => {
  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
          <Table.HeaderCell>Student Full Name</Table.HeaderCell>
            <Table.HeaderCell>DoB</Table.HeaderCell>
            <Table.HeaderCell>First Language</Table.HeaderCell>
            <Table.HeaderCell>Nationality</Table.HeaderCell>
            <Table.HeaderCell>Previous School Name</Table.HeaderCell> 
            <Table.HeaderCell>Previous School Class</Table.HeaderCell>
            <Table.HeaderCell>Father's Name</Table.HeaderCell>
            <Table.HeaderCell>Mother's Name</Table.HeaderCell>
            <Table.HeaderCell>Admission Class</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Bus Required</Table.HeaderCell>
            <Table.HeaderCell>Message</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {admission && admission.map((admiss, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>{admiss?.full_name}</Table.Cell>
                <Table.Cell>{admiss?.DoB}</Table.Cell>
                <Table.Cell>{admiss?.first_language}</Table.Cell>
                <Table.Cell>{admiss?.nationality}</Table.Cell>
                <Table.Cell>{admiss?.prev_school_name}</Table.Cell>
                <Table.Cell>{admiss?.prev_school_class}</Table.Cell>
                <Table.Cell>{admiss?.father_name}</Table.Cell>
                <Table.Cell>{admiss?.mother_name}</Table.Cell>
                <Table.Cell>{admiss?.admission_required}</Table.Cell>
                <Table.Cell>
                  {admiss.address?.street_address_1 +
                    ',' +
                    admiss.address?.city +
                    ',' +
                    admiss.address?.state +
                    ',' +
                    admiss.address?.zip_code +
                    ',' +
                    admiss.address?.country}
                </Table.Cell>
                <Table.Cell>{admiss?.bus_required ? "Yes" : "No"}</Table.Cell>
                <Table.Cell>{admiss?.message}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default AdmissionsList;
