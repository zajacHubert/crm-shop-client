import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { FC, useEffect, useState } from 'react';
import { FormRegisterValues } from '@/types/forms';
import { useLoginMutation, useRegisterMutation } from '@/store/apis/userApi';
import { setAuth } from '@/store/slices/userSlice';
import { Formik } from 'formik';
import * as yup from 'yup';

import Spinner from '../_shared/ui/Spinner';
import {
  StyledBoxError,
  StyledBoxForm,
  StyledPErrorRegister,
  StyledPLogin,
  StyledSpanLink,
  StyledTitleForm,
} from './FormRegister.css';
import {
  StyledBoxLabelError,
  StyledBtnSubmit,
  StyledForm,
  StyledInput,
  StyledLabel,
  StyledPError,
} from '../_shared/ui/Form.css';
import { UserRegisterError } from '@/types/user';

const FormRegister: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [register, { error, isLoading: isRegisterLoading }] =
    useRegisterMutation();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [errRegister, setErrRegister] = useState<UserRegisterError>(
    {} as UserRegisterError
  );

  useEffect(() => {
    if (error) {
      setErrRegister(error as UserRegisterError);
    }
  }, [error]);

  const validationSchema = yup.object().shape({
    name: yup.string().required().min(4).max(50),
    email: yup.string().required().email().min(4).max(50),
    password: yup.string().required().min(4).max(50),
  });

  const initialValues: FormRegisterValues = {
    name: '',
    email: '',
    password: '',
    role_id: '',
  };

  const submitForm = async (values: FormRegisterValues) => {
    const resRegister = await register({
      ...values,
      role_id: '732ab0f4-df43-11ed-b5ea-0242ac120002',
    });
    if ('data' in resRegister) {
      const resLogin = await login({
        email: values.email,
        password: values.password,
      });
      if ('data' in resLogin) {
        dispatch(setAuth(resLogin.data));
        router.push('/home');
      }
    }
  };

  return (
    <StyledBoxForm>
      <StyledTitleForm>Register</StyledTitleForm>
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
              <StyledBtnSubmit type='submit'>Register</StyledBtnSubmit>
              <StyledPLogin>
                Already have an account?
                <Link href='/'>
                  <StyledSpanLink>Signin</StyledSpanLink>
                </Link>
              </StyledPLogin>
              <StyledBoxError>
                {'data' in errRegister && (
                  <StyledPErrorRegister>
                    {errRegister.data.data.email} {errRegister.data.data.name}
                  </StyledPErrorRegister>
                )}
              </StyledBoxError>
            </StyledForm>
          );
        }}
      </Formik>
    </StyledBoxForm>
  );
};

export default FormRegister;
