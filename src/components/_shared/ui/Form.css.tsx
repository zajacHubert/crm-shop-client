import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 500px;
  background-color: ${({ theme }) => theme.lightGray};
  padding: 30px 40px 50px 40px;
`;

export const StyledBoxLabelError = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
`;

export const StyledLabel = styled.label`
  font-size: 18px;
  font-weight: 600;
`;

export const StyledInput = styled.input`
  padding: 5px;
  border: none;
  border-bottom: 1px solid #000;
  background-color: transparent;
  outline: none;
  font-size: 16px;
`;

export const StyledSelect = styled.select`
  background-color: transparent;
  padding: 5px;
  outline: none;
  cursor: pointer;
  font-size: 14px;
`;

export const StyledPError = styled.p`
  color: ${({ theme }) => theme.danger};
  font-size: 14px;

  &::first-letter {
    text-transform: capitalize;
  }
`;

export const StyledTextArea = styled.textarea`
  border: none;
  outline: none;
  border-bottom: 1px solid #000;
  background-color: transparent;
  min-height: 60px;
  padding: 5px;
`;

export const StyledBtnSubmit = styled.button`
  min-width: 100px;
  height: 40px;
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
