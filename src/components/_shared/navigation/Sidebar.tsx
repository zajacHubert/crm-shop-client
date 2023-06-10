import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useLogoutMutation } from '@/store/apis/userApi';
import { logout } from '@/store/slices/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faChartSimple,
  faCartShopping,
  faUser,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import {
  StyledAside,
  StyledBoxIcon,
  StyledBoxLogo,
  StyledBoxMenuItem,
  StyledBoxUser,
  StyledBtnLogout,
  StyledListMenu,
  StyledPName,
  StyledPNavItem,
  StyledTitleLogo,
} from './Sidebar.css';

const Sidebar: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [logoutApi] = useLogoutMutation();
  const auth = useSelector((state: RootState) => state.user.auth);

  const handleLogout = async () => {
    await logoutApi({});
    dispatch(logout());
  };

  return (
    <StyledAside>
      <StyledBoxLogo>
        <Link href='/home'>
          <StyledTitleLogo>CRM Shop</StyledTitleLogo>
        </Link>
      </StyledBoxLogo>
      <nav>
        <StyledListMenu>
          <li>
            <StyledBoxMenuItem
              isActive={router.pathname.includes('/products')}
              onClick={() => router.push('/products?page=1')}
            >
              <StyledBoxIcon isActive={router.pathname.includes('/products')}>
                <FontAwesomeIcon icon={faChartSimple} />
              </StyledBoxIcon>
              <StyledPNavItem isActive={router.pathname.includes('/products')}>
                Products
              </StyledPNavItem>
            </StyledBoxMenuItem>
          </li>
          <li>
            <StyledBoxMenuItem
              isActive={router.pathname.includes('/orders')}
              onClick={() => router.push('/orders?page=1')}
            >
              <StyledBoxIcon isActive={router.pathname.includes('/orders')}>
                <FontAwesomeIcon icon={faCartShopping} />
              </StyledBoxIcon>
              <StyledPNavItem isActive={router.pathname.includes('/orders')}>
                Orders
              </StyledPNavItem>
            </StyledBoxMenuItem>
          </li>
          {auth?.user_logged?.role?.role_name !== 'client' && (
            <li>
              <StyledBoxMenuItem
                isActive={router.pathname.includes('/users')}
                onClick={() => router.push('/users?page=1')}
              >
                <StyledBoxIcon isActive={router.pathname.includes('/users')}>
                  <FontAwesomeIcon icon={faUser} />
                </StyledBoxIcon>
                <StyledPNavItem isActive={router.pathname.includes('/users')}>
                  Users
                </StyledPNavItem>
              </StyledBoxMenuItem>
            </li>
          )}
        </StyledListMenu>
      </nav>
      <StyledBoxUser>
        <StyledPName>{auth?.user_logged?.name}</StyledPName>
        <StyledBoxIcon>
          <StyledBtnLogout onClick={handleLogout}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </StyledBtnLogout>
        </StyledBoxIcon>
      </StyledBoxUser>
    </StyledAside>
  );
};

export default Sidebar;
