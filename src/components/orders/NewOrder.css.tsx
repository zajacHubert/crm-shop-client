import styled from 'styled-components';

export const StyledTitle = styled.h2`
  font-size: 32px;
  margin-bottom: 30px;
`;

export const StyledBoxOrder = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
`;

export const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const StyledListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const StyledPProduct = styled.p`
  font-size: 20px;
  text-transform: capitalize;
`;

export const StyledBoxPriceButton = styled.div`
  display: flex;
  gap: 40px;
`;

export const StyledPPrice = styled.p`
  font-size: 20px;
  font-weight: 600;
`;

export const StyledBtnRemove = styled.button``;

export const StyledBoxSummary = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #000;
  padding-top: 20px;
  margin-bottom: 50px;
`;

export const StyledPSummary = styled.p`
  font-size: 22px;
  font-weight: 600;
`;

export const StyledPTotal = styled.p`
  font-size: 22px;
  font-weight: 600;
`;

export const StyledBtnOrder = styled.button`
  align-self: flex-end;
  min-width: 250px;
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

export const StyledTextNoOrder = styled.h3`
  font-size: 26px;
`;
