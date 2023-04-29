import Head from 'next/head';
import { FC } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { StyledMain } from './Layout.css';

interface LayoutProps {
  title?: string;
  description?: string;
  children?: JSX.Element | JSX.Element[];
}

const Layout: FC<LayoutProps> = ({ title, description, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
      </Head>
      <Sidebar />
      <Header />
      <StyledMain>{children}</StyledMain>
    </>
  );
};

export default Layout;
