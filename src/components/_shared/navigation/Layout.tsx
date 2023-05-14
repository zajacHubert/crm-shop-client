import Head from 'next/head';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useRefreshAuthMutation } from '@/store/apis/userApi';
import { setAuth } from '@/store/slices/userSlice';

import { Auth } from '@/types/user';
import Sidebar from './Sidebar';
import Header from './Header';
import { StyledMain, StyledSection } from './Layout.css';

interface LayoutProps {
  title?: string;
  description?: string;
  children?: JSX.Element | JSX.Element[];
}

const Layout: FC<LayoutProps> = ({ title, description, children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [refreshAuth, {}] = useRefreshAuthMutation();
  const auth = useSelector((state: RootState) => state.user?.auth!);
  const cookieJwt = getCookie('jwt');

  const refreshUser = async (cookieJwt: string) => {
    const res = await refreshAuth({ cookieJwt });
    if ('data' in res) {
      dispatch(setAuth(res.data as unknown as Auth));
    }
  };

  useEffect(() => {
    if (auth?.user_logged && router.route === '/') {
      router.push('/home');
    } else if (!auth?.user_logged && !cookieJwt) {
      router.push('/');
    } else if (!auth?.user_logged && typeof cookieJwt === 'string') {
      refreshUser(cookieJwt);
    }
  }, [auth]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
      </Head>
      {auth && (
        <>
          <Sidebar />
          <Header />
          <StyledMain>
            <StyledSection>{children}</StyledSection>
          </StyledMain>
        </>
      )}
    </>
  );
};

export default Layout;
