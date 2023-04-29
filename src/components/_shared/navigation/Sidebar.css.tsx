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
  width: 160px;
  height: 40px;
  margin: 0 auto;
  margin-bottom: 50px;
  cursor: pointer;
`;

export const StyledTitleLogo = styled.h2``;

export const StyledListMenu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 30px;
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
  background-color: ${({ isActive }) => (isActive ? '#000' : '#ababab')};
  padding: 20px;
  cursor: pointer;
`;

interface StyledBoxIconInterface {
  isActive: boolean;
}

export const StyledBoxIcon = styled.div<StyledBoxIconInterface>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  /* width: 30px;
  height: 30px; */
  color: ${({ isActive }) => (isActive ? '#fff' : '#000')};
`;

interface StyledPNavItemInterface {
  isActive: boolean;
}

export const StyledPNavItem = styled.p<StyledPNavItemInterface>`
  color: ${({ isActive }) => (isActive ? '#fff' : '#000')};
  font-size: 20px;
`;
