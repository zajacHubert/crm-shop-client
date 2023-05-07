import styled from 'styled-components';

export const StyledContainerOrder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 550px;
  margin: 0 auto;
`;

export const StyledTitleOrder = styled.h2`
  font-size: 32px;
  font-weight: 700;
`;

export const StyledPInfo = styled.p`
  font-size: 24px;
`;

export const StyledPTotal = styled.p`
  font-size: 24px;
  font-weight: 600;
`;

export const StyledList = styled.ul``;

export const StyledListItem = styled.li`
  font-size: 18px;
  color: ${({ theme }) => theme.secondary};
  &::first-letter {
    text-transform: uppercase;
  }
`;

export const StyledBtnBack = styled.button`
  width: 250px;
  height: 32px;
  background-color: ${({ theme }) => theme.gray};
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: 0.3s;
  border: 1px solid #000;
  margin-top: 20px;

  &:hover {
    background-color: #cdcdcd;
  }
`;

export const StyledBtnRemove = styled.button`
  width: 250px;
  height: 32px;
  background-color: ${({ theme }) => theme.danger};
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: 0.3s;
  border: 1px solid #000;
  margin-top: 20px;

  &:hover {
    background-color: #ef5350;
  }
`;
