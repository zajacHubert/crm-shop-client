import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { openPopup, setId } from '@/store/slices/popupSlice';
import {
  useDeleteProductMutation,
  useFetchProductsQuery,
} from '@/store/apis/productApi';
import { addProductToOrder } from '@/store/slices/orderSlice';
import { displaySnackBar } from '@/utils/displaySnackBar';
import _ from 'lodash';

import { Product } from '@/types/product';
import Pagination from '@/components/_shared/ui/Pagination';
import Select from '@/components/_shared/ui/Select';
import PopupConfirmDelete from '@/components/_shared/ui/PopupConfirmDelete';
import Snackbar from '@/components/_shared/ui/Snackbar';
import Layout from '@/components/_shared/navigation/Layout';
import RowProductsList from '@/components/products/RowProductsList';
import {
  StyledBoxBtns,
  StyledBtnArrow,
  StyledBtnBuy,
  StyledBtnIcon,
  StyledTable,
  StyledTbody,
  StyledTd,
  StyledTdEmpty,
  StyledTh,
  StyledThead,
  StyledTr,
} from '@/components/_shared/ui/Table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faTrash,
  faArrowDown,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import Spinner from '@/components/_shared/ui/Spinner';

const ProductsPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isPopupOpen = useSelector((state: RootState) => state.popup.isOpen);
  const isSnackBarOpen = useSelector(
    (state: RootState) => state.snackbar.isOpen
  );
  const [deleteFunction] = useDeleteProductMutation();

  const sortParam = router.query.sort_param as string;
  const pageParam = Number(router.query.page);
  const categoryParam = router.query.product_category as string;
  const directionParam = router.query.direction as string;

  const [category, setCategory] = useState<string>(categoryParam ?? '');
  const [sortValue, setSortValue] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<string>('');

  const {
    data: products,
    isLoading,
    isFetching,
    refetch,
  } = useFetchProductsQuery({
    page: pageParam,
    product_category: categoryParam ?? '',
    sort_param: sortParam ?? '',
    direction: directionParam ?? '',
  });

  const chooseCategory = (value: string) => {
    setCategory(value);
    router.query.page = String(1);
    if (value) {
      router.query.product_category = value;
      router.push(router);
    } else {
      delete router.query.product_category;
      router.push(router);
    }
  };

  const removeProduct = (id: string) => {
    dispatch(setId(id));
    dispatch(openPopup());
  };

  const addProduct = (product: Product) => {
    displaySnackBar(dispatch, true, 'Product added to order!');
    dispatch(addProductToOrder(product));
  };

  const loggedUser = useSelector(
    (state: RootState) => state.user.auth?.user_logged
  );

  useEffect(() => {
    router.query.sort_param = sortValue;
    router.query.direction = sortDirection;
    if (!router.query.sort_param) {
      delete router.query.sort_param;
    }
    if (!router.query.direction) {
      delete router.query.direction;
    }
    router.push(router);
  }, [sortValue, sortDirection]);

  useEffect(() => {
    refetch();
  }, [products]);

  if (isLoading || isFetching) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  return (
    <>
      {isPopupOpen && <PopupConfirmDelete deleteFunction={deleteFunction} />}
      {isSnackBarOpen && <Snackbar />}

      <Layout>
        <RowProductsList />
        <StyledTable>
          <StyledThead>
            <StyledTr>
              <StyledTh>Product number</StyledTh>
              <StyledTh>
                Product name
                <StyledBtnArrow
                  color={sortValue === 'product_name' ? '#fff' : '#aaa'}
                  wayUp={
                    sortValue === 'product_name' && sortDirection === 'asc'
                  }
                  onClick={() => {
                    setSortValue('product_name');
                    setSortDirection(
                      `${
                        sortValue === 'product_name' && sortDirection === 'asc'
                          ? 'desc'
                          : 'asc'
                      }`
                    );
                  }}
                >
                  <FontAwesomeIcon icon={faArrowDown} />
                </StyledBtnArrow>
              </StyledTh>
              <StyledTh>Category</StyledTh>
              <StyledTh>
                Price
                <StyledBtnArrow
                  color={sortValue === 'product_price' ? '#fff' : '#aaa'}
                  wayUp={
                    sortValue === 'product_price' && sortDirection === 'asc'
                  }
                  onClick={() => {
                    setSortValue('product_price');
                    setSortDirection(
                      `${
                        sortValue === 'product_price' && sortDirection === 'asc'
                          ? 'desc'
                          : 'asc'
                      }`
                    );
                  }}
                >
                  <FontAwesomeIcon icon={faArrowDown} />
                </StyledBtnArrow>
              </StyledTh>
              <StyledTh>Actions</StyledTh>
            </StyledTr>
          </StyledThead>
          <StyledTbody>
            {!products?.data.length && !isLoading && (
              <StyledTr>
                <StyledTdEmpty>No products</StyledTdEmpty>
              </StyledTr>
            )}
            {Boolean(products?.data.length && !isLoading) &&
              products?.data?.map((product, i) => (
                <StyledTr key={product.id}>
                  <StyledTd>{i + 1 + (pageParam - 1) * 10}</StyledTd>
                  <StyledTd>{product.product_name}</StyledTd>
                  <StyledTd>{product.product_category}</StyledTd>
                  <StyledTd>{product.product_price}</StyledTd>
                  <StyledTd>
                    <StyledBoxBtns>
                      <StyledBtnIcon
                        onClick={() => router.push(`/products/${product.id}`)}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </StyledBtnIcon>
                      {loggedUser?.role.role_name !== 'client' && (
                        <>
                          <StyledBtnIcon
                            onClick={() =>
                              router.push(`/products/${product.id}/edit`)
                            }
                          >
                            <FontAwesomeIcon icon={faPen} />
                          </StyledBtnIcon>
                          <StyledBtnIcon
                            onClick={() => removeProduct(product.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </StyledBtnIcon>
                        </>
                      )}
                      <StyledBtnBuy onClick={() => addProduct(product)}>
                        Buy
                      </StyledBtnBuy>
                    </StyledBoxBtns>
                  </StyledTd>
                </StyledTr>
              ))}
          </StyledTbody>
        </StyledTable>
        <Pagination listLength={products?.total! ?? 1} />
        <Select
          options={['bargain', 'sale', 'newest', 'regular']}
          title='All categories'
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            chooseCategory(e.target.value)
          }
          align='right'
          value={category}
        />
      </Layout>
    </>
  );
};

export default ProductsPage;
