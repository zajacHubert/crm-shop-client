import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useRegisterMutation } from '@/store/apis/userApi';
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useFetchRolesQuery } from '@/store/apis/roleApi';
import { displaySnackBar } from '@/utils/displaySnackBar';
import Snackbar from '../_shared/ui/Snackbar';

import { FormAddUserValues } from '@/types/forms';
import {
  StyledBoxForm,
  StyledSelectRoles,
  StyledTitleForm,
} from './FormAddUser.css';
import {
  StyledBoxLabelError,
  StyledBtnSubmit,
  StyledForm,
  StyledInput,
  StyledLabel,
  StyledPError,
} from '../_shared/ui/Form.css';

const FormAddUser: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [addUser, { error }] = useRegisterMutation();
  const { data: roles } = useFetchRolesQuery();
  const isSnackBarOpen = useSelector(
    (state: RootState) => state.snackbar.isOpen
  );
  const loggedUser = useSelector(
    (state: RootState) => state.user.auth?.user_logged
  );

  const validationSchema = yup.object().shape({
    name: yup.string().required().min(4).max(50),
    email: yup.string().required().email().min(4).max(50),
    password: yup.string().required().min(4).max(50),
    role_id: yup.string().required(),
  });

  const initialValues: FormAddUserValues = {
    name: '',
    email: '',
    password: '',
    role_id: '',
  };

  const submitForm = async (values: FormAddUserValues) => {
    const res = await addUser(values);
    if ('error' in res) {
      displaySnackBar(dispatch, false, 'Add user failed');
    }
    if ('data' in res) {
      displaySnackBar(dispatch, true, 'User has been added');
      setTimeout(() => {
        router.push('/users?page=1');
      }, 2000);
    }
  };
  return (
    <>
      {isSnackBarOpen && <Snackbar />}

      <StyledBoxForm>
        <StyledTitleForm>Add a new user</StyledTitleForm>
        <Formik
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
                <StyledBoxLabelError>
                  <StyledLabel>Password</StyledLabel>
                  {errors.password && touched.password && (
                    <StyledPError>{errors.password}</StyledPError>
                  )}
                </StyledBoxLabelError>
                <StyledInput
                  name='password'
                  type='password'
                  value={values.password}
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

                  {roles?.map((role) => {
                    if (
                      loggedUser?.role.role_name !== 'admin' &&
                      role.role_name === 'admin'
                    ) {
                      return null;
                    } else {
                      return (
                        <option key={role?.id} value={role?.id}>
                          {role.role_name}
                        </option>
                      );
                    }
                  })}
                </StyledSelectRoles>
                <StyledBtnSubmit type='submit'>Add User</StyledBtnSubmit>
              </StyledForm>
            );
          }}
        </Formik>
      </StyledBoxForm>
    </>
  );
};

export default FormAddUser;
