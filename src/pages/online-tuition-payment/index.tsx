import { API } from '@/../constants';
import HtmlDynamic from '@/base/htmlDynamic';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { tw, css } from 'twind/css';
const Payments = dynamic(() => import('../../components/payments/PaymentGateway'), {
  ssr: false,
});

export const getServerSideProps = async () => {
  const preload = await axios.get(`${API}/page?href=secure-payments`);
  //   const fetched = await preload.data.json();
  // console.log(fetched,"fetched")
  if (preload.status !== 200) {
    return {
      notFound: true,
    };
  }
  return {
    props: { data: preload.data },
  };
};

const headerstyle = css`
  padding: 20px 50px;
  @media only screen and (max-width: 600px) {
    padding: 20px;
  }
`;
const PaymentGateway = ({ data }) => {
  return (
    <div>
      <div className={tw(headerstyle)}>
        <HtmlDynamic data={data} center={false} />
      </div>
      <Payments />
    </div>
  );
};

export default PaymentGateway;
