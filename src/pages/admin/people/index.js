import { useState } from 'react';
import styled from 'styled-components';
import BaseHeading from '@/base/BaseHeader';
import FacultyList from '../../../components/faculty/facultylist';
import {  Icon } from 'semantic-ui-react';
import BreadcrumbSection from '@/base/Breadcrumb';
const sections = [
  { key: 'Home', content: 'Home', link: true, href: '/admin' },
  { key: 'People', content: 'People', link: true },
];
const People = (props) => {
  const [people, setPeople] = useState([]);

  // const preload = () => {
  //     axios.get(`${API}/page?href=school-board`);
  // }

  return (
    <StyledContainer>
      
        <Icon name="arrow left" color="blue" style={{ cursor: 'pointer' }} onClick={() => history.back()} />
        <BreadcrumbSection sections={sections} />
      <div>
        <BaseHeading Heading="People/Members" size="large" />
      </div>
      
      <FacultyList edit/>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
   {
    padding: 50px 100px;
  }
`;
export default People;

