import Layout from '@/components/_shared/navigation/Layout';
import RowListProduct from '@/components/products/RowListProducts';
import _ from 'lodash';
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
import { NextPage } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faTrash,
  faArrowDown,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import {
  useDeleteProductMutation,
  useFetchProductsQuery,
} from '@/store/apis/productApi';
import { useEffect, useState, ChangeEvent } from 'react';
import { Product } from '@/types/product';
import Pagination from '@/components/_shared/ui/Pagination';
import Select from '@/components/_shared/ui/Select';
import { updateSortParams } from '@/utils/updateSortParams';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import PopupConfirmDelete from '@/components/_shared/ui/PopupConfirmDelete';
import { openPopup, setId } from '@/store/slices/popupSlice';
import Snackbar from '@/components/_shared/ui/Snackbar';
import {
  closeSnackbar,
  openSnackBar,
  setMessage,
  setSuccess,
} from '@/store/slices/snackbarSlice';
import { addProductToOrder } from '@/store/slices/orderSlice';

const ProductsPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isPopupOpen = useSelector((state: RootState) => state.popup.isOpen);
  const isSnackBarOpen = useSelector(
    (state: RootState) => state.snackbar.isOpen
  );

  const [deleteFunction, {}] = useDeleteProductMutation();

  const sortParam = router.query.sort;
  const pageParam = Number(router.query.page);
  const searchParam = router.query.search as string;
  const categoryParam = router.query.product_category as string;
  const wayParam: string = router.query.way ? String(router.query.way) : '';

  const [category, setCategory] = useState<string>(categoryParam ?? '');

  const {
    data: products,
    isLoading,
    isSuccess,
    isFetching,
    refetch,
  } = useFetchProductsQuery({
    page: pageParam,
    product_category: categoryParam ?? '',
  });
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!isLoading || isSuccess) {
      if (sortParam) {
        const way = wayParam === 'asc' ? 'asc' : 'desc';
        setSortedProducts(_.orderBy(products?.data!, [String(sortParam)], way));
      } else {
        setSortedProducts(products?.data!);
      }
    }
  }, [isLoading, isSuccess, sortParam, wayParam, searchParam, products?.data!]);

  const chooseCategory = (value: string) => {
    setCategory(value);
    router.query.page = String(1);
    if (value) {
      router.query.product_category = value;
      router.push(router);
      refetch();
    } else {
      delete router.query.product_category;
      router.push(router);
      refetch();
    }
  };

  const removeProduct = (id: string) => {
    dispatch(setId(id));
    dispatch(openPopup());
  };

  const addProduct = (product: Product) => {
    dispatch(closeSnackbar());
    dispatch(setSuccess(true));
    dispatch(setMessage('Product added to order!'));
    dispatch(openSnackBar());
    dispatch(addProductToOrder(product));
  };

  if (isLoading || isFetching) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  return (
    <>
      {isPopupOpen && <PopupConfirmDelete deleteFunction={deleteFunction} />}
      {isSnackBarOpen && <Snackbar />}

      <Layout>
        <RowListProduct />
        <StyledTable>
          <StyledThead>
            <StyledTr>
              <StyledTh>Product number </StyledTh>
              <StyledTh>
                Product name
                <StyledBtnArrow
                  color={sortParam === 'product_name' ? '#fff' : '#aaa'}
                  wayUp={sortParam === 'product_name' && wayParam === 'asc'}
                  onClick={() =>
                    updateSortParams(router, 'product_name', wayParam)
                  }
                >
                  <FontAwesomeIcon icon={faArrowDown} />
                </StyledBtnArrow>
              </StyledTh>
              <StyledTh>
                Category
                <StyledBtnArrow
                  color={sortParam === 'product_category' ? '#fff' : '#aaa'}
                  wayUp={sortParam === 'product_category' && wayParam === 'asc'}
                  onClick={() =>
                    updateSortParams(router, 'product_category', wayParam)
                  }
                >
                  <FontAwesomeIcon icon={faArrowDown} />
                </StyledBtnArrow>
              </StyledTh>
              <StyledTh>
                Price
                <StyledBtnArrow
                  color={sortParam === 'product_price' ? '#fff' : '#aaa'}
                  wayUp={sortParam === 'product_price' && wayParam === 'asc'}
                  onClick={() =>
                    updateSortParams(router, 'product_price', wayParam)
                  }
                >
                  <FontAwesomeIcon icon={faArrowDown} />
                </StyledBtnArrow>
              </StyledTh>
              <StyledTh>Actions</StyledTh>
            </StyledTr>
          </StyledThead>
          <StyledTbody>
            {!sortedProducts.length && !isLoading && (
              <StyledTr>
                <StyledTdEmpty>No products</StyledTdEmpty>
              </StyledTr>
            )}
            {Boolean(sortedProducts.length && !isLoading) &&
              sortedProducts?.map((product, i) => (
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
                      <StyledBtnIcon
                        onClick={() =>
                          router.push(`/products/${product.id}/edit`)
                        }
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </StyledBtnIcon>
                      <StyledBtnIcon onClick={() => removeProduct(product.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </StyledBtnIcon>
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
