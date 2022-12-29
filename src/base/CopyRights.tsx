import styled from 'styled-components';

const CopyRights = () => {
  return (
    <>
      <StyledDiv>
        {/* <StyledFlex> */}
        <div>© Copyright 2022, Rahbar Foundation School,<br/> All rights reserved</div>
        <div>
          Developed with 💙 By{' '}
          <a href="https://thegoldendev.netlify.app" target="_blank">
            Ahmer
          </a>
          &nbsp;&nbsp;&nbsp;
        </div>
        {/* </StyledFlex> */}
      </StyledDiv>
    </>
  );
};

const StyledDiv = styled.div`
   {
    background: #0e1636;
    display: flex;
    justify-content: space-between;
    padding: 10px 50px;
    position: absolute;
    width: 100%;
    bototm: 0;

    @media only screen and (max-width: 600px) {
      flex-direction: column;
      gap : 20px;
      padding : 12px;
      margin-top : 12px;
    }
  }
`;

const StyledFlex = styled.div`
   {
    display: flex;
    width: 100%;
  }
`;

export default CopyRights;
