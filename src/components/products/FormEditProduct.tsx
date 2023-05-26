import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useEditProductMutation,
  useFetchProductQuery,
} from '@/store/apis/productApi';
import { displaySnackBar } from '@/utils/displaySnackBar';
import { RootState } from '@/store';
import { Formik } from 'formik';
import * as yup from 'yup';

import Snackbar from '../_shared/ui/Snackbar';
import { FormEditProductValues } from '@/types/forms';
import { StyledBoxForm, StyledTitleForm } from './FormEditProduct.css';
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
import Layout from '../_shared/navigation/Layout';
import Spinner from '../_shared/ui/Spinner';

const FormEditProduct: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [editProduct] = useEditProductMutation();
  const isSnackBarOpen = useSelector(
    (state: RootState) => state.snackbar.isOpen
  );
  const id = router.query.id as string;
  const { data, isLoading, isFetching } = useFetchProductQuery(id);
  const [initialValues, setInitialValues] = useState<FormEditProductValues>({});

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

  useEffect(() => {
    setInitialValues({
      product_name: data?.product_name!,
      product_desc: data?.product_desc!,
      product_category: data?.product_category!,
      product_price: data?.product_price!,
    });
  }, [data]);

  const submitForm = async (values: FormEditProductValues) => {
    const res = await editProduct({ ...values, id });
    if ('error' in res) {
      displaySnackBar(dispatch, false, 'Editing failed!');
    }
    if ('data' in res) {
      displaySnackBar(dispatch, true, 'Product has been edited!');
      setTimeout(() => {
        router.push(`/products?page=1`);
      }, 2000);
    }
  };

  if (isLoading || isFetching) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  return (
    <>
      {isSnackBarOpen && <Snackbar />}
      <StyledBoxForm>
        <StyledTitleForm>Add a new product</StyledTitleForm>
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
                <StyledBtnSubmit>Edit</StyledBtnSubmit>
              </StyledForm>
            );
          }}
        </Formik>
      </StyledBoxForm>
    </>
  );
};

export default FormEditProduct;
