import Layout from '@/components/_shared/navigation/Layout';
import FormLogin from '@/components/start/FormLogin';
import { NextPage } from 'next';

const HomePage: NextPage = () => {
  return (
    <Layout>
      <FormLogin />
    </Layout>
  );
};

export default HomePage;
