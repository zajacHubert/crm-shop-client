import styled from 'styled-components';

export const StyledBoxForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  width: 100vw;
  height: 100vh;
`;

export const StyledTitleForm = styled.h2`
  font-size: 34px;
`;

export const StyledPRegister = styled.p`
  text-align: center;
  font-size: 18px;
`;

export const StyledSpanLink = styled.span`
  margin-left: 5px;
  font-weight: 600;
`;

export const StyledBoxError = styled.div`
  position: relative;
  height: 20px;
`;

export const StyledPErrorLogin = styled.p`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  color: ${({ theme }) => theme.danger};
`;
