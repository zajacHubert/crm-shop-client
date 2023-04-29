import { useRouter } from 'next/router';
import { FC } from 'react';
import {
  StyledBoxTitle,
  StyledBoxUser,
  StyledBoxUserInfo,
  StyledBtnLogout,
  StyledContainerHeader,
  StyledContainerMain,
  StyledHeader,
  StyledPName,
  StyledPRole,
  StyledTitle,
} from '../Header.css';

const Header: FC = () => {
  const router = useRouter();
  const title = !router.pathname.split('/')[1]
    ? 'Home Page'
    : router.pathname.split('/')[1];

  return (
    <StyledHeader>
      <StyledContainerHeader>
        <StyledContainerMain>
          <StyledBoxTitle>
            <StyledTitle>{title}</StyledTitle>
          </StyledBoxTitle>
          <StyledBoxUser>
            <StyledBoxUserInfo>
              <StyledPName>Lucjan Lucjanowy</StyledPName>
              <StyledPRole>Employee</StyledPRole>
            </StyledBoxUserInfo>
            <StyledBtnLogout>Logout</StyledBtnLogout>
          </StyledBoxUser>
        </StyledContainerMain>
      </StyledContainerHeader>
    </StyledHeader>
  );
};

export default Header;
