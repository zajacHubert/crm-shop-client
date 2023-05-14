import { NextPage } from 'next';
import Layout from '@/components/_shared/navigation/Layout';
import WelcomeView from '@/components/start/WelcomeView';

const HomePage: NextPage = () => {
  return (
    <Layout>
      <WelcomeView />
    </Layout>
  );
};

export default HomePage;
