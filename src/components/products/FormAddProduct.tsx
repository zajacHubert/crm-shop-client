import { useRouter } from 'next/router';
import { FC } from 'react';
import { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { useAddProductMutation } from '@/store/apis/productApi';
import { displaySnackBar } from '@/utils/displaySnackBar';
import { Formik } from 'formik';
import * as yup from 'yup';

import { FormAddProductValues } from '@/types/forms';
import Snackbar from '../_shared/ui/Snackbar';
import { StyledBoxForm, StyledTitleForm } from './FormAddProduct.css';
import {
  StyledBoxLabelError,
  StyledBtnSubmit,
  StyledForm,
  StyledInput,
  StyledLabel,
  StyledPError,
  StyledSelect,
  StyledTextArea,
} from '../_shared/ui/Form.css';

const FormAddProduct: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [addProduct] = useAddProductMutation();
  const isSnackBarOpen = useSelector(
    (state: RootState) => state.snackbar.isOpen
  );

  const validationSchema = yup.object().shape({
    product_name: yup.string().required().min(4).max(50),
    product_desc: yup.string().required().min(4).max(200),
    product_category: yup
      .string()
      .required()
      .oneOf(['regular', 'sale', 'bargain', 'newest']),
    product_price: yup
      .number()
      .required('Price is required')
      .positive('Price must be positive')
      .typeError('Price must be a number')
      .test('is-decimal', 'Price must have up to 2 decimal places', (value) => {
        if (!value) return true;
        return /^\d+(\.\d{1,2})?$/.test(value.toString());
      }),
  });

  const initialValues: FormAddProductValues = {
    product_name: '',
    product_desc: '',
    product_category: 'regular',
    product_price: 0,
  };

  const submitForm = async (values: FormAddProductValues) => {
    const res = await addProduct(values);
    if ('error' in res) {
      displaySnackBar(dispatch, false, 'Product already exists!');
    }
    if ('data' in res) {
      displaySnackBar(dispatch, true, 'Product has been added');
      setTimeout(() => {
        router.push('/products?page=1');
      }, 2000);
    }
  };

  return (
    <>
      {isSnackBarOpen && <Snackbar />}
      <StyledBoxForm>
        <StyledTitleForm>Add a new product</StyledTitleForm>
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
                  <StyledLabel>Product name</StyledLabel>
                  {errors.product_name && touched.product_name && (
                    <StyledPError>{errors.product_name}</StyledPError>
                  )}
                </StyledBoxLabelError>
                <StyledInput
                  name='product_name'
                  type='text'
                  value={values.product_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <StyledBoxLabelError>
                  <StyledLabel>Product description</StyledLabel>
                  {errors.product_desc && touched.product_desc && (
                    <StyledPError>{errors.product_desc}</StyledPError>
                  )}
                </StyledBoxLabelError>
                <StyledTextArea
                  name='product_desc'
                  value={values.product_desc}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <StyledBoxLabelError>
                  <StyledLabel>Product category</StyledLabel>
                  {errors.product_category && touched.product_category && (
                    <StyledPError>{errors.product_category}</StyledPError>
                  )}
                </StyledBoxLabelError>
                <StyledSelect name='product_category'>
                  <option value='regular'>Regular</option>
                  <option value='bargain'>Bargain</option>
                  <option value='sale'>Sale</option>
                  <option value='newest'>Newest</option>
                </StyledSelect>
                <StyledBoxLabelError>
                  <StyledLabel>Product price</StyledLabel>
                  {errors.product_price && touched.product_price && (
                    <StyledPError>{errors.product_price}</StyledPError>
                  )}
                </StyledBoxLabelError>
                <StyledInput
                  name='product_price'
                  type='number'
                  value={values.product_price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min='0.00'
                  max='100000.00'
                  step='0.01'
                />
                <StyledBtnSubmit>Add</StyledBtnSubmit>
              </StyledForm>
            );
          }}
        </Formik>
      </StyledBoxForm>
    </>
  );
};

export default FormAddProduct;
