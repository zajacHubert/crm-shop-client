import styled from 'styled-components';

export const StyledBtnRemove = styled.button`
  min-width: 120px;
  height: 30px;
  background-color: ${({ theme }) => theme.danger};
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: 0.3s;
  border: 1px solid black;

  &:hover {
    background-color: #ff7961;
  }
`;
