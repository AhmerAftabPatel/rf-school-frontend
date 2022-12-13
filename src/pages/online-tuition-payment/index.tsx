import dynamic from 'next/dynamic';
const Payments = dynamic(() => import('../../components/payments/PaymentGateway'), {
  ssr: false,
});

const PaymentGateway = () => {

    
  return (
    <div>
      <Payments />
    </div>
  );
};

export default PaymentGateway;
