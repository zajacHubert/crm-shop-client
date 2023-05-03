import styled, { keyframes } from 'styled-components';

interface StyledContainerSnackbarProps {
  success: boolean;
  isOpen: boolean;
}

const fadeIn = keyframes`
from {
  bottom: 0;
}
to {
  bottom: 80px;
}

`;

export const StyledContainerSnackbar = styled.div<StyledContainerSnackbarProps>`
  display: flex;
  align-items: center;
  gap: 20px;
  position: fixed;
  z-index: 100;
  bottom: 80px;
  left: 300px;
  background-color: ${({ success, theme }) =>
    success ? '#4e9a51' : theme.danger};
  padding: 8px 20px;
  animation: ${fadeIn} 0.2s ease-out;
`;

export const StyledPMessage = styled.p`
  font-size: 20px;
`;

export const StyledBtnIcon = styled.button`
  cursor: pointer;
`;
