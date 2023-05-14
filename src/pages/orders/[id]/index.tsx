import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import {
  useDeleteOrderMutation,
  useFetchOrderQuery,
} from '@/store/apis/orderApi';
import { openPopup, setId } from '@/store/slices/popupSlice';
import { formatDate } from '@/utils/formatDate';
import { displaySnackBar } from '@/utils/displaySnackBar';

import { Product } from '@/types/product';
import Layout from '@/components/_shared/navigation/Layout';
import PopupConfirmDelete from '@/components/_shared/ui/PopupConfirmDelete';
import Snackbar from '@/components/_shared/ui/Snackbar';
import {
  StyledBtnBack,
  StyledContainerOrder,
  StyledList,
  StyledListItem,
  StyledPInfo,
  StyledTitleOrder,
  StyledPTotal,
  StyledBtnRemove,
} from '@/components/orders/SingleOrderPage.css';

const SingleOrderPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isPopupOpen = useSelector((state: RootState) => state.popup.isOpen);
  const isSnackBarOpen = useSelector(
    (state: RootState) => state.snackbar.isOpen
  );
  const [deleteFunction, { isLoading, isSuccess }] = useDeleteOrderMutation();
  const id = router.query.id as string;
  const { data } = useFetchOrderQuery(id);

  const removeOrder = () => {
    dispatch(setId(id));
    dispatch(openPopup());
  };

  if (isSuccess) {
    displaySnackBar(dispatch, true, 'Order has been deleted');
    setTimeout(() => {
      router.push('/orders?page=1');
    }, 2000);
  }

  if (isLoading) {
    return (
      <Layout>
        <p>Loading</p>
      </Layout>
    );
  }

  return (
    <>
      {isPopupOpen && <PopupConfirmDelete deleteFunction={deleteFunction} />}
      {isSnackBarOpen && <Snackbar />}
      <Layout>
        <StyledContainerOrder>
          {isSnackBarOpen ? (
            <StyledTitleOrder>Order has been deleted</StyledTitleOrder>
          ) : (
            <>
              <StyledTitleOrder>
                {data?.user.name} - {formatDate(data?.created_at!)}
              </StyledTitleOrder>
              <StyledPInfo>{data?.user.email}</StyledPInfo>
              <StyledPTotal>Total: {data?.value}</StyledPTotal>
              <StyledPInfo>Ordered products:</StyledPInfo>
              <StyledList>
                {data?.products.map((product: Product) => (
                  <StyledListItem key={product.id}>
                    {product.product_name} - {product.product_price}
                  </StyledListItem>
                ))}
              </StyledList>
              <StyledBtnBack onClick={() => router.back()}>Back</StyledBtnBack>
              <StyledBtnRemove onClick={removeOrder}>
                Remove Order
              </StyledBtnRemove>
            </>
          )}
        </StyledContainerOrder>
      </Layout>
    </>
  );
};

export default SingleOrderPage;
