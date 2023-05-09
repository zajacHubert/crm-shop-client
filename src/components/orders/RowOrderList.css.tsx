import styled from 'styled-components';

export const StyledRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 30px;
  height: 50px;
  margin-bottom: 50px;
`;

export const StyledText = styled.h4`
  font-size: 30px;
`;

export const StyledSelectSort = styled.select`
  outline: none;
  padding: 5px;
  min-width: 130px;
  font-size: 18px;
`;

export const StyledBtn = styled.button`
  min-width: 150px;
  height: 36px;
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
