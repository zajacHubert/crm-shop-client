import styled from 'styled-components';

export const StyledAside = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  height: 100vh;
  background-color: ${({ theme }) => theme.lightGray};
  padding-top: 40px;
`;

export const StyledBoxLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 3px solid black;
  margin: 0 auto;
  margin-bottom: 100px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.gray};
`;

export const StyledTitleLogo = styled.h2`
  font-size: 32px;
  text-align: center;
`;

export const StyledListMenu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 30px;
  margin-bottom: 80px;
`;

interface StyledBoxMenuItemInterface {
  isActive: boolean;
}

export const StyledBoxMenuItem = styled.div<StyledBoxMenuItemInterface>`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 200px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  background-color: ${({ isActive, theme }) =>
    isActive ? '#000' : theme.gray};
  padding: 20px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${({ isActive }) => (isActive ? '#000' : '#cdcdcd')};
  }
`;

interface StyledBoxIconInterface {
  isActive?: boolean;
}

export const StyledBoxIcon = styled.div<StyledBoxIconInterface>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: ${({ isActive }) => (isActive ? '#fff' : '#000')};
`;

interface StyledPNavItemInterface {
  isActive: boolean;
}

export const StyledPNavItem = styled.p<StyledPNavItemInterface>`
  color: ${({ isActive }) => (isActive ? '#fff' : '#000')};
  font-size: 20px;
`;

export const StyledBoxUser = styled.div`
  align-self: center;
`;

export const StyledPName = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
`;

export const StyledBtnLogout = styled.button`
  font-size: 26px;
`;
