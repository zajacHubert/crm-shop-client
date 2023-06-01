import styled from 'styled-components';

export const StyledBoxOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 99;
`;

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
  font-size: 20px;
  font-weight: 600;
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
  letter-spacing: 1px;
  transition: all 0.3s ease 0s;

  &:hover {
    background-color: #ababab;
  }
`;

export const StyledBtnConfirm = styled.button`
  width: 100%;
  height: 52px;
  background-color: ${(props) => props.theme.secondary};
  color: rgb(255, 255, 255);
  font-size: 16px;
  letter-spacing: 1px;
  transition: all 0.3s ease 0s;

  &:hover {
    background-color: #ababab;
  }
`;
