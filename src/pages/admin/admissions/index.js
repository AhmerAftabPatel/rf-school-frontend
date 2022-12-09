import { useEffect, useState } from 'react';
import styled from 'styled-components';
import BaseHeading from '@/base/BaseHeader';
import { Icon, Pagination } from 'semantic-ui-react';
import BreadcrumbSection from '@/base/Breadcrumb';
import axios from 'axios';
import { API } from '@/../constants';
import AdmissionsList from '../../../components/admissionslist';
import { useRouter } from 'next/router';
const sections = [
  { key: 'Home', content: 'Home', link: true, href: '/admin' },
  { key: 'Admissions', content: 'Admissions', link: true },
];
const People = (props) => {
  const [admissions, setAdmissions] = useState([]);
  const [total_pages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const history = useRouter();
  const preload = () => {
    axios
      .get(
        `${API}/admission?limit=${history.query.limit ? history.query.limit : '10'}&page=${
          history.query.page ? history.query.page : '1'
        }`,
      )
      .then((res) => {
        setAdmissions(res.data.admission);
        setTotalPages(res.data.total_pages);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlePaginationChange = (e, { activePage }) => {
    history.push({ query: { limit: 1, page: activePage } });
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
        <BaseHeading Heading="Admissions" size="large" />
      </div>
      <AdmissionsList admission={admissions} />
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
