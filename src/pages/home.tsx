import Layout from '@/components/_shared/navigation/Layout';
import WelcomeView from '@/components/start/WelcomeView';
import { NextPage } from 'next';

const HomePage: NextPage = () => {
  return (
    <Layout>
      <WelcomeView />
    </Layout>
  );
};

export default HomePage;
