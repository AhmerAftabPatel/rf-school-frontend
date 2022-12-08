import styled from 'styled-components';

const ThemeButton = ({ children }) => {
  return <StyledButton>{children}</StyledButton>;
};

const StyledButton = styled.button`
   {
    color: #ffffff;
    cursor: pointer;
    background: #1e40af;
    border-radius: 7px;
    border: 2px solid #ffffff;
    padding: 12px;
  }
`;

export default ThemeButton;