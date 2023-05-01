import styled, { keyframes } from 'styled-components';

const fadein = keyframes`
    from {
      bottom: -100px;
    
    }
    to {
      bottom: 80px;
    }
`;

interface StyledContainerSnackbarProps {
  success: boolean;
}

export const StyledContainerSnackbar = styled.div<StyledContainerSnackbarProps>`
  display: flex;
  align-items: center;
  gap: 20px;
  position: fixed;
  z-index: 100;
  bottom: 80px;
  left: 300px;
  animation: ${fadein} 0.5s;
  background-color: ${({ success }) => (success ? '#4e9a51' : '#d84646')};
  padding: 8px 20px;
`;

export const StyledPMessage = styled.p`
  font-size: 20px;
`;

export const StyledBtnIcon = styled.button`
  cursor: pointer;
`;
