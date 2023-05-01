import styled from 'styled-components';

export const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: center;
  background-color: ${({ theme }) => theme.lightGray};
  margin-bottom: 30px;
`;

export const StyledThead = styled.thead`
  background-color: ${({ theme }) => theme.primary};
  color: #fff;
`;

export const StyledTr = styled.tr``;

export const StyledTh = styled.th`
  font-size: 24px;
  font-weight: 700;
  padding: 10px;
`;

export const StyledTbody = styled.tbody``;

export const StyledTd = styled.td`
  text-transform: capitalize;
  font-size: 20px;
  padding: 10px;
`;

export const StyledBoxBtns = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

export const StyledBtnIcon = styled.button`
  color: #343232;
  transition: 0.2s;
  font-size: 20px;
  width: 22px;
  height: 22px;

  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: scale(1.2);
  }
`;

interface StyledBtnArrowInterface {
  color: string;
  wayUp: boolean;
}

export const StyledBtnArrow = styled.button<StyledBtnArrowInterface>`
  width: 15px;
  height: 15px;
  margin-left: 5px;
  color: ${({ color }) => color};
  transform: ${({ wayUp }) => (wayUp ? 'rotate(180deg)' : '')};
`;

export const StyledTdEmpty = styled.td.attrs(() => ({
  colSpan: '100',
}))`
  padding: 10px;
  font-weight: 700;
`;

export const StyledBtnBuy = styled.button`
  min-width: 100px;
  height: 26px;
  background-color: ${({ theme }) => theme.gray};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: 0.3s;
  border: 1px solid black;
  margin-left: 8px;

  &:hover {
    background-color: #cdcdcd;
  }
`;
