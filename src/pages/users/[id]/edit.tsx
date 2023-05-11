import Layout from '@/components/_shared/navigation/Layout';
import FormEditUser from '@/components/users/FormEditUser';
import { useFetchUserQuery } from '@/store/apis/userApi';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

const EditUserPage: NextPage = () => {
  return (
    <Layout>
      <FormEditUser />
    </Layout>
  );
};

export default EditUserPage;
