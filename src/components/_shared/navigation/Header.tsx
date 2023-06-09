import { useRouter } from 'next/router';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useLogoutMutation } from '@/store/apis/userApi';
import { logout } from '@/store/slices/userSlice';

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

const Header: FC = () => {
  const router = useRouter();
  const [logoutApi] = useLogoutMutation();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.user.auth);
  const title = router.pathname.split('/')[1];

  const handleLogout = async () => {
    await logoutApi({});
    dispatch(logout());
  };

  return (
    <StyledHeader>
      <StyledContainerHeader>
        <StyledContainerMain>
          <StyledBoxTitle>
            <StyledTitle>{title}</StyledTitle>
          </StyledBoxTitle>
          <StyledBoxUser>
            <StyledBoxUserInfo>
              <StyledPName>{auth?.user_logged?.name}</StyledPName>
              <StyledPRole>{auth?.user_logged?.role?.role_name}</StyledPRole>
            </StyledBoxUserInfo>
            <StyledBtnLogout onClick={handleLogout}>Logout</StyledBtnLogout>
          </StyledBoxUser>
        </StyledContainerMain>
      </StyledContainerHeader>
    </StyledHeader>
  );
};

export default Header;
