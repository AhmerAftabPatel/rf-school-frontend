import { API, s3_url } from '@/../constants';
import BaseHeading from '@/base/BaseHeader';
import BreadcrumbSection from '@/base/Breadcrumb';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Icon, Table } from 'semantic-ui-react';
import styled from 'styled-components';

const Jobs = () => {
  const history = useRouter();
  console.log(
    history.query.id,
    '<ThemeButton onClick={() => history.push(`/admin/jobs/${job._id}`)} >View Candidates</ThemeButton>',
  );
  const [candidates, setCandidates] = useState([]);
  const preload = (id) => {
    axios
      .get(`${API}/candidates${id !== 'all' ? `?id=${id}` : ''}`)
      .then((res) => {
        setCandidates(res.data.candidates);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  useEffect(() => {
    if (history.query.id) {
      preload(history.query.id);
    }
  }, [history]);

  const sections = [
    { key: 'Home', content: 'Home', link: true, href: '/admin' },
    { key: 'Jobs', content: 'Jobs', link: true },
    { key: history.query.id, content: history.query.id, link: true },
  ];
  return (
    <StyledContainer>
      <Icon name="arrow left" color="blue" style={{ cursor: 'pointer' }} onClick={() => history.back()} />
      <BreadcrumbSection sections={sections} />
      <BaseHeading Heading={`${history.query.name ? history.query.name : ''} Candidates`} size="small" />
      <br />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Full Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Phone Number</Table.HeaderCell>
            <Table.HeaderCell>Resume</Table.HeaderCell>
            <Table.HeaderCell>Position</Table.HeaderCell>
            <Table.HeaderCell>Current Salary</Table.HeaderCell>
            <Table.HeaderCell>Total experience</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Message</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {candidates.map((candidate, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>{candidate?.full_name}</Table.Cell>
                <Table.Cell>{candidate.email}</Table.Cell>
                <Table.Cell>{candidate.phone_name}</Table.Cell>
                <Table.Cell>
                  <a href={s3_url + candidate?.resume}>View Resume</a>
                  {candidate.phone_name}
                </Table.Cell>
                <Table.Cell positive={candidate?.job_id?.status} negative={!candidate?.job_id?.status}>
                  {candidate?.job_id?.title}
                </Table.Cell>
                <Table.Cell>{candidate?.current_salary}</Table.Cell>
                <Table.Cell>{candidate?.total_experience}</Table.Cell>
                <Table.Cell>
                  {candidate?.address &&
                    candidate?.address?.street_address_1 +
                      ',' +
                      candidate?.address?.city +
                      ',' +
                      candidate?.address?.country}
                </Table.Cell>
                <Table.Cell collapsing>{candidate?.message}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
   {
    padding: 50px 100px;
    width: 100%;
    overflow: auto;
  }
`;

export default Jobs;
