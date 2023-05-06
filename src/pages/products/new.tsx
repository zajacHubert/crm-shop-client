import Layout from '@/components/_shared/navigation/Layout';
import FormAddProduct from '@/components/products/FormAddProduct';
import { NextPage } from 'next';

const NewProductPage: NextPage = () => {
  return (
    <Layout>
      <FormAddProduct />
    </Layout>
  );
};

export default NewProductPage;
