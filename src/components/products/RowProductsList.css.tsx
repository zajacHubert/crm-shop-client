import styled from 'styled-components';

export const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

export const StyledContainerOrder = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #000;
  width: 430px;
  height: 100px;
  padding: 20px;
  background-color: ${({ theme }) => theme.lightGray};
`;

export const StyledBoxText = styled.div``;

export const StyledPOrderElement = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 6px;
`;

export const StyledSpan = styled.span`
  font-size: 20px;
  font-weight: 700;
`;

export const StyledBtnOrder = styled.button`
  min-width: 150px;
  height: 50px;
  background-color: ${({ theme }) => theme.gray};
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: 0.3s;
  border: 1px solid black;

  &:hover {
    background-color: #cdcdcd;
  }
`;
