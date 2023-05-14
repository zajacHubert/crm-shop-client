import { NextPage } from 'next';
import Layout from '@/components/_shared/navigation/Layout';
import FormEditUser from '@/components/users/FormEditUser';

const EditUserPage: NextPage = () => {
  return (
    <Layout>
      <FormEditUser />
    </Layout>
  );
};

export default EditUserPage;
