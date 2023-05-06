import Layout from '@/components/_shared/navigation/Layout';
import FormEditProduct from '@/components/products/FormEditProduct';
import { NextPage } from 'next';

const EditProductPage: NextPage = () => {
  return (
    <Layout>
      <FormEditProduct />
    </Layout>
  );
};

export default EditProductPage;
