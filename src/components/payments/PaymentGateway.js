import { API, rz_Id } from '@/../constants';
import BaseHeading from '@/base/BaseHeader';
import Tuition from '@/components/forms/tuition-payment';
import SelectType from '@/components/payments/selecttype';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from 'semantic-ui-react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const Headerstyle = styled.div`
   {
    padding: 20px 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media only screen and (max-width: 600px) {
      padding: 0;
    }
  }
`;

const Payments = () => {
  const history = useRouter();
  const [type, setType] = useState('');
  const [PaymentSuccessOpen, setPaymentSuccessOpen] = useState(false);
  const [paymentValues, setPaymentValues] = useState({
    type: '',
    razorpay_signature: '',
    razorpay_order_id: '',
    transactionid: '',
    transactionamount: 0,
  });
  var options = {
    key: rz_Id,
    subscription_id: '',
    amount: '', // 2000 paise = INR 20, amount in paisa
    name: 'Rahbar Foundation',
    description: '',
    invoice_details: {},
    order_id: '',
    handler: function (response) {
      console.log(response, 'payment response');
      var values = {
        razorpay_signature: response.razorpay_signature,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_subscription_id: response.razorpay_subscription_id,
        transactionid: response.razorpay_payment_id,
        transactionamount: paymentValues.transactionamount,
        invoice_details: options.invoice_details,
      };
      axios
        .post(`${API}/payment`, values)
        .then((res) => {
          setPaymentValues({
            type: res.data.type,
            razorpay_signature: res.data.details.razorpay_signature,
            razorpay_order_id: res.data.details.razorpay_order_id,
            transactionid: res.data.details.transactionid,
            transactionamount: res.data.details.transactionamount,
          });
          setPaymentSuccessOpen(true);
          history.push(`/payment-status?id=${paymentValues.transactionid}`);
        })
        .catch((e) => {
          alert(e.response && e.response.data && e.response.data.error);
        });
    },
    prefill: {
      name: '',
      email: '',
      contact: '',
    },
    notes: {
      address: '',
    },
    theme: {
      color: '#6c5ce7',
    },
  };
  const SubmitPayment = (values, next) => {
    axios
      .post(`${API}/order`, values)
      .then((res) => {
        options.order_id = res.data.id;
        options.amount = res.data.amount;
        options.prefill.name = values.full_name;
        options.prefill.email = values.email;
        options.prefill.contact = values.phone_number;
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
      })
      .catch((e) => {
        if (e.response && e.response.data && e.response.data.error) {
          alert(e.response.data.error);
        }

      });
  };

  const SwitchTypes = (type) => {
    switch (type) {
      case 'TUITION':
        return <Tuition type={type} submit={SubmitPayment} />;
      default:
        return <Tuition type={type} submit={SubmitPayment} />;
    }
  };

  const SelectTypeOption = (type) => {
    setType(type);
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);


  return (
    <Headerstyle>
      <BaseHeading Heading={'Secure Payment'} center />
      <StyledCard>{type ? SwitchTypes(type) : <SelectType SelectType={SelectTypeOption} />}</StyledCard>
    </Headerstyle>
  );
};

const StyledCard = styled.div`
   {
    // text-align: center;
    width: 100%;
    padding: 14px;
    margin: 14px;
    border: 5px;
    width: 900px;
  }
`;

export default Payments;
