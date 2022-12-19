import { API } from '@/../constants';
import ThemeButton from '@/base/Button';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Icon, Table } from 'semantic-ui-react';
import styled from 'styled-components';

const Headerstyle = styled.div`
   {
    padding: 20px 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media only screen and (max-width: 600px) {
      padding: 20px;
    }
  }
`;
const PaymentSuccess = (req, res) => {
  const [transaction, setTransaction] = useState({
    details: { transactionid: '', transactionamount: 0, razorpay_order_id : "" },
    full_name: '',
    status: '',
  });
  const history = useRouter();

  const preload = (id) => {
    axios
      .get(`${API}/transaction?id=${id}`)
      .then((res) => {
        setTransaction(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    if (history.query.id) {
      preload(history.query.id);
    }
  }, [history]);

  return (
    <Headerstyle>
      {transaction && transaction.status === 'SUCCESS' ? (
        <Icon name="checkmark" color="green" size="huge" />
      ) : (
        <Icon name="warning" color="orange" size="huge" />
      )}
      <h1>Payment {transaction?.status}</h1>
      <Table celled color={transaction.status === 'SUCCESS' ? "green" : "red"}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>{transaction.status === 'SUCCESS' ? 'Transaction id' : 'Order Id'}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>{transaction?.full_name}</Table.Cell>
            <Table.Cell>{transaction?.status}</Table.Cell>
            <Table.Cell>Rs. {transaction?.details?.transactionamount / 100}</Table.Cell>
            <Table.Cell>
              {transaction.status === 'SUCCESS'
                ? transaction?.details?.transactionid
                : transaction?.details?.razorpay_order_id}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <div>
        <ThemeButton onClick={() => alert('Not yet integrated')}>Get Reciept</ThemeButton>
        <ThemeButton onClick={() => history.push('online-tuition-payment')}>Pay Again</ThemeButton>
      </div>
    </Headerstyle>
  );
};

export default PaymentSuccess;
