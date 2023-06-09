import styled from 'styled-components';

export const StyledContainer = styled.div``;

export const StyledTextDelete = styled.h3`
  font-size: 30px;
  font-weight: 700;
`;

export const StyledRowUser = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 50px;
`;

export const StyledBoxIcon = styled.div`
  font-size: 100px;
`;

export const StyledBoxUser = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const StyledTextName = styled.h3`
  font-size: 28px;
  text-transform: capitalize;
`;

export const StyledBoxEmail = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
`;

export const StyledTextEmail = styled.p`
  font-size: 26px;
`;

export const StyledTextRole = styled.p`
  font-size: 20px;
  color: ${({ theme }) => theme.secondary};

  &::first-letter {
    text-transform: uppercase;
  }
`;

export const StyledBoxBtns = styled.div`
  display: flex;
  gap: 20px;
`;

export const StyledBtnEdit = styled.button`
  min-width: 120px;
  height: 30px;
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

export const StyledRowOrders = styled.div``;

export const StyledPEmpty = styled.p`
  font-size: 24px;
  font-weight: 600;
`;

export const StyledListOrders = styled.ul``;

export const StyledListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

export const StyledPDate = styled.p`
  font-size: 18px;
  width: 155px;
  font-weight: 600;
`;

export const StyledPValue = styled.p`
  font-size: 18px;
  font-weight: 500;
  width: 60px;
`;

export const StyledBtnOrder = styled.button`
  min-width: 140px;
  height: 26px;
  background-color: ${({ theme }) => theme.gray};
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: 0.3s;
  border: 1px solid black;

  &:hover {
    background-color: #cdcdcd;
  }
`;
