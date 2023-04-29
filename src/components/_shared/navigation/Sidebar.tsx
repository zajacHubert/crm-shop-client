import { FC } from 'react';
import {
  StyledAside,
  StyledBoxIcon,
  StyledBoxLogo,
  StyledBoxMenuItem,
  StyledListMenu,
  StyledPNavItem,
  StyledTitleLogo,
} from './Sidebar.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faChartSimple,
  faCartShopping,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

const Sidebar: FC = () => {
  const router = useRouter();
  return (
    <StyledAside>
      <StyledBoxLogo>
        <Link href='/'>
          <StyledTitleLogo>CRM Shop</StyledTitleLogo>
        </Link>
      </StyledBoxLogo>
      <nav>
        <StyledListMenu>
          <li>
            <Link href='/products'>
              <StyledBoxMenuItem
                isActive={router.pathname.includes('/products')}
                onClick={() => router.push('/products?page=1')}
              >
                <StyledBoxIcon isActive={router.pathname.includes('/products')}>
                  <FontAwesomeIcon icon={faChartSimple} />
                </StyledBoxIcon>

                <StyledPNavItem
                  isActive={router.pathname.includes('/products')}
                >
                  Products
                </StyledPNavItem>
              </StyledBoxMenuItem>
            </Link>
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
        </StyledListMenu>
      </nav>
    </StyledAside>
  );
};

export default Sidebar;
