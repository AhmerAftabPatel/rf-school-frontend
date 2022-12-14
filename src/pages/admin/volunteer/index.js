import { useEffect, useState } from 'react';
import styled from 'styled-components';
import BaseHeading from '@/base/BaseHeader';
import { Icon, Pagination } from 'semantic-ui-react';
import BreadcrumbSection from '@/base/Breadcrumb';
import axios from 'axios';
import { API } from '@/../constants';
import VolunteerList from '@/components/volunteer';
import { useRouter } from 'next/router';
const sections = [
  { key: 'Home', content: 'Home', link: true, href: '/admin' },
  { key: 'Volunteer', content: 'Volunteer', link: true },
];
const People = (props) => {
  const [volunteer, setVolunteer] = useState([]);
  const [total_pages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const history = useRouter();
  const preload = () => {
    axios
      .get(
        `${API}/volunteer?limit=${history.query.limit ? history.query.limit : '10'}&page=${
          history.query.page ? history.query.page : '1'
        }`,
      )
      .then((res) => {
        setVolunteer(res.data.volunteers);
        setTotalPages(res.data.total_pages);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlePaginationChange = (e, { activePage }) => {
    history.push({ query: { limit: 10, page: activePage } });
    setCurrentPage(activePage);
  };
  useEffect(() => {
    preload();
  }, [history]);

  return (
    <StyledContainer>
      <Icon name="arrow left" color="blue" style={{ cursor: 'pointer' }} onClick={() => history.back()} />
      <BreadcrumbSection sections={sections} />
      <div>
        <BaseHeading Heading="Volunteer Sign Ups" size="large" />
      </div>
      <VolunteerList volunteer={volunteer} />
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

const StyledContainer = styled.div`
   {
    padding: 50px 100px;
  }
`;
export default People;
