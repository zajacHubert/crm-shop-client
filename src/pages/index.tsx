import Layout from '@/components/_shared/navigation/Layout';
import Sidebar from '@/components/_shared/navigation/Sidebar';
import FormLogin from '@/components/start/FormLogin';
import { NextPage } from 'next';

const HomePage: NextPage = () => {
  return (
    <Layout>
      <h1>Login</h1>
      <FormLogin />
    </Layout>
  );
};

export default HomePage;
