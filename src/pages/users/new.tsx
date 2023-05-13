import Layout from '@/components/_shared/navigation/Layout';
import FormAddUser from '@/components/users/FormAddUser';
import { NextPage } from 'next';

const NewUserPage: NextPage = () => {
  return (
    <Layout>
      <FormAddUser />
    </Layout>
  );
};

export default NewUserPage;
