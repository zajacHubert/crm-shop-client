import { NextPage } from 'next';
import Layout from '@/components/_shared/navigation/Layout';
import FormAddUser from '@/components/users/FormAddUser';

const NewUserPage: NextPage = () => {
  return (
    <Layout>
      <FormAddUser />
    </Layout>
  );
};

export default NewUserPage;
