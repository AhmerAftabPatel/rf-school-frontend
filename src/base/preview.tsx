import { Modal } from 'semantic-ui-react';
import styled from 'styled-components';
const PreviewModal = ({ open, setOpen, children }) => {
  const closeModal = () => {
    setOpen(!open);
  };
  return (
    <>
      <Modal size='large' open={open} onClose={closeModal} closeIcon>
        <StyledContainer>{children}</StyledContainer>
      </Modal>
    </>
  );
};

const StyledContainer = styled.div`
   {
    padding: 10px;
    @media only screen and (max-width: 600px) {
      padding: 10px;
    }
  }
`;

export default PreviewModal;
