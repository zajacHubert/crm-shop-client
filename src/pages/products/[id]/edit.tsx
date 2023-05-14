import { NextPage } from 'next';
import Layout from '@/components/_shared/navigation/Layout';
import FormEditProduct from '@/components/products/FormEditProduct';

const EditProductPage: NextPage = () => {
  return (
    <Layout>
      <FormEditProduct />
    </Layout>
  );
};

export default EditProductPage;
