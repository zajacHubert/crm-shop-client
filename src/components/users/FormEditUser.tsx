import { useFetchUserQuery } from '@/store/apis/userApi';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useFetchRolesQuery } from '@/store/apis/roleApi';
import { StyledBoxForm } from '../products/FormAddProduct.css';
import { StyledTitleForm } from './FormEditUser.css';

const FormEditUser: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const id = router.query.id as string;
  const { data: user } = useFetchUserQuery(id);
  const { data: roles } = useFetchRolesQuery();

  const validationSchema = yup.object().shape({
    product_name: yup.string().required().min(4).max(50),
    product_desc: yup.string().required().min(4).max(200),
    name: yup.string().min(4).max(50),
    email: yup.string().email().min(4).max(50),
    password: yup.string().email().min(4).max(50),
  });

  return (
    <StyledBoxForm>
      <StyledTitleForm>Edit user</StyledTitleForm>
    </StyledBoxForm>
  );
};

export default FormEditUser;
