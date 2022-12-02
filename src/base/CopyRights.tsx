import styled from 'styled-components';

const CopyRights = () => {
  return (
    <>
      <StyledDiv>
        {/* <StyledFlex> */}
        <div>© Copyright 2022, Rahbar Foundation School, All rights reserved</div>
        <div >Developed with 💙 
        By <a href='https://thegoldendev.netlify.app' target='_blank'>Ahmer</a>&nbsp;&nbsp;&nbsp;</div>
        {/* </StyledFlex> */}
      </StyledDiv>
    </>
  );
};

const StyledDiv = styled.div`
   {
    // height: 30px;
    background: #0e1636;
    display : flex;
    justify-content : space-between;
    padding : 10px 50px;
    position : absolute;
    width : 100%;
    bototm : 0;
  }
`;

const StyledFlex = styled.div`{
    display : flex;
    width : 100%;
}`

export default CopyRights;
