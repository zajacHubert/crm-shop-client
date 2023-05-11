import { useFetchUserQuery } from '@/store/apis/userApi';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';

const FormEditUser: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const id = router.query.id as string;
  const { data } = useFetchUserQuery(id);
  console.log(data);
  return <div>FormEditUser</div>;
};

export default FormEditUser;
