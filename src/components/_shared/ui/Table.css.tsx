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
  font-size: 20px;
  padding: 10px;
`;

export const StyledBoxBtns = styled.div`
  display: flex;
  gap: 20px;
`;

export const StyledBtnIcon = styled.button`
  color: #343232;
  transition: 0.3s;
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
