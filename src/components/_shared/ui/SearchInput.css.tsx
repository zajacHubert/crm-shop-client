import styled from 'styled-components';

export const StyledBoxInput = styled.div`
  position: relative;
`;

export const StyledInput = styled.input`
  width: 300px;
  height: 40px;
  background-color: ${({ theme }) => theme.lightGray};
  border-radius: 20px;
  border: 1px solid black;
  outline: none;
  padding-left: 15px;
  font-size: 16px;
`;

export const StyledBoxIcon = styled.div`
  position: absolute;
  top: 0;
  left: 265px;
  width: 20px;
  height: 20px;
  transform: translateY(50%);
`;
