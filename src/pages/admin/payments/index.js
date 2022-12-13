import { useEffect, useState } from 'react';
import styled from 'styled-components';
import BaseHeading from '@/base/BaseHeader';
import { Icon, Pagination } from 'semantic-ui-react';
import BreadcrumbSection from '@/base/Breadcrumb';
import axios from 'axios';
import { API } from '@/../constants';
import PaymensList from '@/components/payments/PaymentsList';
import { useRouter } from 'next/router';
const sections = [
  { key: 'Home', content: 'Home', link: true, href: '/admin' },
  { key: 'Payments', content: 'Payments', link: true },
];
const AllPayments = (props) => {
  const [payments, setPayments] = useState([]);
  const [total_pages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const history = useRouter();
  const preload = () => {
    axios
      .get(
        `${API}/transactions?limit=${history.query.limit ? history.query.limit : '10'}&page=${
          history.query.page ? history.query.page : '1'
        }`,
      )
      .then((res) => {
        setPayments(res.data.transactions);
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
        <BaseHeading Heading="All Payment" size="large" />
      </div>
      <PaymensList payments={payments} preload={preload}/>
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
    width : 100%;
    overflow : auto;
  }
`;
export default AllPayments;
