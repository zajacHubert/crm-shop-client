import styled from 'styled-components';

export const StyledHeader = styled.header`
  margin-left: 240px;
`;

export const StyledContainerHeader = styled.div`
  padding: 44px 32px;

  @media (max-width: 1600px) {
    margin: 0 30px;
  }

  @media (max-width: 768px) {
    margin: 0 20px;
  }

  @media (max-width: 600px) {
    margin: 0 10px;
  }
`;

export const StyledContainerMain = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledBoxTitle = styled.div``;

export const StyledTitle = styled.h2`
  font-size: 40px;
  font-weight: 700;
  text-transform: uppercase;
`;

export const StyledBoxUser = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;
`;

export const StyledBoxUserInfo = styled.div``;

export const StyledPName = styled.p`
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
`;

export const StyledPRole = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.secondary};
`;

export const StyledBtnLogout = styled.button`
  background-color: ${({ theme }) => theme.gray};
  font-size: 20px;
  font-weight: 500;
  padding: 5px 50px;
  border: 1px solid black;
  transition: 0.3s;

  &:hover {
    background-color: #cdcdcd;
  }
`;
