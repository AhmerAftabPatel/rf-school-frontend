import { useState } from 'react';
import styled from 'styled-components';
import BaseHeading from '@/base/BaseHeader';
import FacultyList from '../../../components/faculty/facultylist';
import {  Icon } from 'semantic-ui-react';
import BreadcrumbSection from '@/base/Breadcrumb';
import axios from 'axios';
import {API} from '../../../../constants'
const sections = [
  { key: 'Home', content: 'Home', link: true, href: '/admin' },
  { key: 'People', content: 'People', link: true },
];
const People = (props) => {
  const [people, setPeople] = useState([]);
  const [heading, setHeading] = useState({ page: '', description: '', heading: '', banner: '', folder: '', flyer: '' });
  // const preload = () => {
  //     axios.get(`${API}/page?href=school-board`);
  // }


  const preload = () => {
    axios
      .get(`${API}/people`)
      .then((res) => {
        setPeople(res.data.people);
        setHeading(res.data.heading);
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
      
        <Icon name="arrow left" color="blue" style={{ cursor: 'pointer' }} onClick={() => history.back()} />
        <BreadcrumbSection sections={sections} />
      <div>
        <BaseHeading Heading="People/Members" size="large" />
      </div>
      
      <FacultyList edit people={people} heading={heading} preload={preload}/>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
   {
    padding: 50px 100px;
  }
`;
export default People;

