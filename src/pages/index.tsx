import { useFetchProductsQuery } from '@/store/apis/productApiSlice';
import { NextPage } from 'next';

const HomePage: NextPage = () => {
  const { data } = useFetchProductsQuery({ page: 1 });
  console.log(data);
  return <div>HomePage</div>;
};

export default HomePage;
