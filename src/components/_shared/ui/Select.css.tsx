import styled from 'styled-components';

interface StyledBoxSelectProps {
  align?: string;
}

export const StyledBoxSelect = styled.div<StyledBoxSelectProps>`
  position: relative;
  text-align: ${({ align }) => align ?? ''};
`;

export const StyledSelect = styled.select`
  font-size: 16px;
  width: 250px;
  height: 50px;
  padding: 0 16px;
  border: 1px inset rgb(118, 118, 118);
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px ${({ theme }) => theme.secondary} inset !important;
    box-shadow: 0 0 0 30px ${({ theme }) => theme.secondary} inset !important;
  }
  cursor: pointer;
  text-transform: capitalize;

  &:focus {
    outline: none;
  }
`;

interface StyledLabelProps {
  isActive: boolean;
  bgColor: string;
}

export const StyledLabel = styled.label<StyledLabelProps>`
  position: absolute;
  top: ${({ isActive }) => (isActive ? 0 : '50%')};
  left: 0;
  translate: ${({ isActive }) => (isActive ? '5px -50%' : '10px -50%')};
  transition: 0.3s;
  background-color: ${({ bgColor }) => bgColor};
  padding: 0 5px;
  font-size: ${({ isActive }) => (isActive ? '10px' : '18px')};
`;

export const StyledError = styled.p`
  font-size: 14px;
  color: red;
`;
