import { useEditUserMutation, useFetchUserQuery } from '@/store/apis/userApi';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useFetchRolesQuery } from '@/store/apis/roleApi';
import { StyledBoxForm } from '../products/FormAddProduct.css';
import { StyledTitleForm } from './FormEditUser.css';
import { RootState } from '@/store';
import Snackbar from '../_shared/ui/Snackbar';
import { FormEditUserValues } from '@/types/forms';
import { displaySnackBar } from '@/utils/displaySnackBar';
import {
  StyledBoxLabelError,
  StyledBtnSubmit,
  StyledForm,
  StyledInput,
  StyledLabel,
  StyledPError,
} from '../_shared/ui/Form.css';
import { StyledSelectRoles } from './FormAddUser.css';

const FormEditUser: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const id = router.query.id as string;
  const { data: user } = useFetchUserQuery(id);
  const { data: roles } = useFetchRolesQuery();
  const isSnackBarOpen = useSelector(
    (state: RootState) => state.snackbar.isOpen
  );
  const [editUser] = useEditUserMutation();

  const [initialValues, setInitialValues] = useState<FormEditUserValues>(
    {} as FormEditUserValues
  );

  const validationSchema = yup.object().shape({
    name: yup.string().required().min(4).max(50),
    email: yup.string().email().min(4).max(50),
    role_id: yup.string().required(),
  });

  const submitForm = async (values: FormEditUserValues) => {
    const res = await editUser({ ...values, id });
    if ('error' in res) {
      displaySnackBar(dispatch, false, 'Edit user failed');
    }
    if ('data' in res) {
      displaySnackBar(dispatch, true, 'User has been edited');
      setTimeout(() => {
        router.push('/users?page=1');
      }, 2000);
    }
  };

  useEffect(() => {
    setInitialValues({
      name: user?.name!,
      email: user?.email!,
      role_id: user?.role_id!,
    });
  }, [user]);

  return (
    <>
      {isSnackBarOpen && <Snackbar />}

      <StyledBoxForm>
        <StyledTitleForm>Edit user</StyledTitleForm>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitForm}
        >
          {(formik) => {
            const {
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              handleBlur,
            } = formik;
            return (
              <StyledForm onSubmit={handleSubmit} noValidate>
                <StyledBoxLabelError>
                  <StyledLabel>Name</StyledLabel>
                  {errors.name && touched.name && (
                    <StyledPError>{errors.name}</StyledPError>
                  )}
                </StyledBoxLabelError>
                <StyledInput
                  name='name'
                  type='text'
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <StyledBoxLabelError>
                  <StyledLabel>Email</StyledLabel>
                  {errors.email && touched.email && (
                    <StyledPError>{errors.email}</StyledPError>
                  )}
                </StyledBoxLabelError>
                <StyledInput
                  name='email'
                  type='text'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <StyledBoxLabelError style={{ height: '25px' }}>
                  <StyledLabel>Role</StyledLabel>
                  {errors.role_id && touched.role_id && (
                    <StyledPError>{errors.role_id}</StyledPError>
                  )}
                </StyledBoxLabelError>
                <StyledSelectRoles
                  name='role_id'
                  value={values.role_id}
                  onChange={handleChange}
                >
                  <option value=''>Choose role</option>
                  {roles?.map((role) => (
                    <option key={role?.id} value={role?.id}>
                      {role.role_name}
                    </option>
                  ))}
                </StyledSelectRoles>
                <StyledBtnSubmit type='submit'>Edit user</StyledBtnSubmit>
              </StyledForm>
            );
          }}
        </Formik>
      </StyledBoxForm>
    </>
  );
};

export default FormEditUser;
