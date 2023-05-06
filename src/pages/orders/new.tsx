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
import { RootState } from '@/store';
import { removeProductFromOrder } from '@/store/slices/orderSlice';
import { Product } from '@/types/product';
import { countOrderValue } from '@/utils/counteOrderValue';
import { NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';

const NewOrderPage: NextPage = () => {
  const dispatch = useDispatch();
  const orderedProducts = useSelector(
    (state: RootState) => state.order.orderedProducts
  );

  const orderValue = orderedProducts.length
    ? countOrderValue(orderedProducts)
    : 0;
  const loggedUser = useSelector(
    (state: RootState) => state.user.auth?.user_logged
  );

  const addOrder = async () => {};
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
            <StyledBtnOrder>Order</StyledBtnOrder>
          </>
        ) : (
          <StyledTextNoOrder>No ordered products</StyledTextNoOrder>
        )}
      </StyledBoxOrder>
    </Layout>
  );
};

export default NewOrderPage;
