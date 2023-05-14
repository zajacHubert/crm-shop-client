import { NextPage } from 'next';
import Layout from '@/components/_shared/navigation/Layout';
import FormAddProduct from '@/components/products/FormAddProduct';

const NewProductPage: NextPage = () => {
  return (
    <Layout>
      <FormAddProduct />
    </Layout>
  );
};

export default NewProductPage;
