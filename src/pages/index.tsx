import Sidebar from '@/components/_shared/navigation/Sidebar';
import { NextPage } from 'next';

const HomePage: NextPage = () => {
  return (
    <>
      <div>
        <Sidebar />
      </div>
    </>
  );
};

export default HomePage;
