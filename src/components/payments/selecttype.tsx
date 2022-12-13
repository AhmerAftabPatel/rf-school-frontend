import styled from 'styled-components';

const types_of_payments = ['TUITION', 'DONATE'];

const SelectType = ({ SelectType }) => {
  return (
    <div>
      <h1>Select Payment Type</h1>
      {types_of_payments.map((payment, index) => {
        return (
          <StyledDiv key={index} onClick={() => SelectType(payment)}>
            {payment}
          </StyledDiv>
        );
      })}
    </div>
  );
};

const StyledDiv = styled.div`
   {
    height: 50px;
    // width : 300px;
    margin : 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000000;
    border-radius: 9px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    cursor : pointer;
    :hover{
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
  }
`;

export default SelectType;
