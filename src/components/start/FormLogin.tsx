import { FC } from 'react';
import { StyledBoxForm, StyledTitleForm } from './FormLogin.css';
import {
  StyledBoxLabelError,
  StyledBtnSubmit,
  StyledForm,
  StyledInput,
  StyledLabel,
  StyledPError,
} from '../_shared/ui/Form.css';
import { Formik } from 'formik';
import * as yup from 'yup';
import { FormLoginValues } from '@/types/forms';
import { useLoginMutation } from '@/store/apis/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '@/store/slices/userSlice';
import { RootState } from '@/store';
import { useRouter } from 'next/router';

const FormLogin: FC = () => {
  const router = useRouter();
  const [login, {}] = useLoginMutation();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.user.auth);

  const validationSchema = yup.object().shape({
    email: yup.string().required().email().min(4).max(50),
    password: yup.string().required().min(4).max(50),
  });

  const initialValues: FormLoginValues = {
    email: '',
    password: '',
  };

  const submitForm = async (values: FormLoginValues) => {
    const res = await login(values);
    if ('data' in res) {
      dispatch(setAuth(res.data));
      router.push('/home');
    }
  };
  return (
    <StyledBoxForm>
      <StyledTitleForm>Login</StyledTitleForm>
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
              <StyledBtnSubmit>Login</StyledBtnSubmit>
            </StyledForm>
          );
        }}
      </Formik>
    </StyledBoxForm>
  );
};

export default FormLogin;
