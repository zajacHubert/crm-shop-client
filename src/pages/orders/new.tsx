import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import {
  useAddOrderMutation,
  useFetchOrdersQuery,
} from '@/store/apis/orderApi';
import { clearOrder, removeProductFromOrder } from '@/store/slices/orderSlice';
import { countOrderValue } from '@/utils/counteOrderValue';
import { displaySnackBar } from '@/utils/displaySnackBar';
import { Product } from '@/types/product';

import Layout from '@/components/_shared/navigation/Layout';
import { StyledBtnRemove } from '@/components/_shared/ui/ButtonRemove.css';
import {
  StyledBoxOrder,
  StyledBoxPriceButton,
  StyledBoxSummary,
  StyledBtnOrder,
  StyledList,
  StyledListItem,
  StyledPPrice,
  StyledPProduct,
  StyledPSummary,
  StyledPTotal,
  StyledTextNoOrder,
  StyledTitle,
} from '@/components/orders/NewOrder.css';
import Spinner from '@/components/_shared/ui/Spinner';
import { useEffect } from 'react';

const NewOrderPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [addNewOrder, { isSuccess, isLoading }] = useAddOrderMutation();
  const orderedProducts = useSelector(
    (state: RootState) => state.order.orderedProducts
  );

  const orderValue = orderedProducts.length
    ? countOrderValue(orderedProducts)
    : 0;
  const loggedUser = useSelector(
    (state: RootState) => state.user.auth?.user_logged
  );

  const addOrder = async () => {
    const res = await addNewOrder({
      user_id: loggedUser?.id!,
      productsIds: orderedProducts.map((product) => product.id),
      value: orderValue as number,
    });
    if ('data' in res) {
      displaySnackBar(dispatch, true, 'Ordered successfully');
      router.push('/products?page=1');
      dispatch(clearOrder());
    } else {
      displaySnackBar(dispatch, false, 'Order filed!');
    }
  };

  if (isLoading) {
    return (
      <>
        <Layout>
          <Spinner />
        </Layout>
      </>
    );
  }

  return (
    <Layout>
      <StyledTitle>{orderedProducts.length ? 'Your Order' : ''}</StyledTitle>
      <StyledBoxOrder>
        {orderedProducts.length ? (
          <>
            <StyledList>
              {orderedProducts.map((product: Product) => (
                <StyledListItem key={product.id}>
                  <StyledPProduct>{product.product_name}</StyledPProduct>
                  <StyledBoxPriceButton>
                    <StyledPPrice>{product.product_price}</StyledPPrice>
                    <StyledBtnRemove
                      onClick={() =>
                        dispatch(removeProductFromOrder(product.id))
                      }
                    >
                      Remove
                    </StyledBtnRemove>
                  </StyledBoxPriceButton>
                </StyledListItem>
              ))}
            </StyledList>
            <StyledBoxSummary>
              <StyledPSummary>Total</StyledPSummary>
              <StyledPTotal>{orderValue}</StyledPTotal>
            </StyledBoxSummary>
            <StyledBtnOrder onClick={addOrder}>Order</StyledBtnOrder>
          </>
        ) : (
          <StyledTextNoOrder>No ordered products</StyledTextNoOrder>
        )}
      </StyledBoxOrder>
    </Layout>
  );
};

export default NewOrderPage;
