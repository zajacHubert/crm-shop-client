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
} from './Header.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const Header: FC = () => {
  const router = useRouter();
  const title = router.pathname.split('/')[1];
  const loggedUser = useSelector(
    (state: RootState) => state.user.auth?.user_logged
  );

  return (
    <StyledHeader>
      <StyledContainerHeader>
        <StyledContainerMain>
          <StyledBoxTitle>
            <StyledTitle>{title}</StyledTitle>
          </StyledBoxTitle>
          <StyledBoxUser>
            <StyledBoxUserInfo>
              <StyledPName>{loggedUser?.name}</StyledPName>
              <StyledPRole>{loggedUser?.role?.role_name}</StyledPRole>
            </StyledBoxUserInfo>
            <StyledBtnLogout>Logout</StyledBtnLogout>
          </StyledBoxUser>
        </StyledContainerMain>
      </StyledContainerHeader>
    </StyledHeader>
  );
};

export default Header;
