import styled from 'styled-components';

export const StyledBoxPopupConfirm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  width: 600px;
  padding: 30px;
  position: fixed;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  border: 2px solid ${({ theme }) => theme.primary};
  background-color: #f3f3fb;
`;

export const StyledTextConfirm = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  color: ${({ theme }) => theme.primary};
  border: 4px solid ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.secondary};
`;

export const StyledBoxBtns = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 50px;
`;

export const StyledBtnCancel = styled.button`
  width: 100%;
  height: 52px;
  background-color: ${({ theme }) => theme.primary};
  color: rgb(255, 255, 255);
  font-size: 16px;
  font-family: Orbitron, sans-serif;
  letter-spacing: 1px;
  transition: all 0.3s ease 0s;

  &:hover {
    opacity: 0.9;
  }
`;

export const StyledBtnConfirm = styled.button`
  width: 100%;
  height: 52px;
  background-color: ${(props) => props.theme.secondary};
  color: rgb(255, 255, 255);
  font-size: 16px;
  font-family: Orbitron, sans-serif;
  letter-spacing: 1px;
  transition: all 0.3s ease 0s;

  &:hover {
    opacity: 0.9;
  }
`;
