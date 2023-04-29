import Layout from '@/components/_shared/navigation/Layout';
import Sidebar from '@/components/_shared/navigation/Sidebar';
import { NextPage } from 'next';

const HomePage: NextPage = () => {
  return (
    <Layout>
      <h1>
        Start Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Laboriosam, ullam dignissimos. Accusantium dignissimos cupiditate
        ducimus voluptas minima ullam tempora quis? Optio ratione dolorum rem
        animi, atque vitae esse non quasi?{' '}
      </h1>
    </Layout>
  );
};

export default HomePage;
