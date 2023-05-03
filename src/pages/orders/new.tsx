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
  StyledTitle,
} from '@/components/orders/NewOrder.css';
import { RootState } from '@/store';
import { removeProductFromOrder } from '@/store/slices/orderSlice';
import { Product } from '@/types/product';
import { NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';

const NewOrderPage: NextPage = () => {
  const dispatch = useDispatch();
  const orderedProducts = useSelector(
    (state: RootState) => state.order.orderedProducts
  );
  const orderValue = orderedProducts.length
    ? orderedProducts.reduce(
        (prev, curr) => prev + Number(curr.product_price),
        0
      )
    : 0;
  return (
    <Layout>
      <StyledTitle>Your Order</StyledTitle>
      <StyledBoxOrder>
        <StyledList>
          {orderedProducts.map((product: Product, i: number) => (
            <StyledListItem key={product.id}>
              <StyledPProduct>{product.product_name}</StyledPProduct>
              <StyledBoxPriceButton>
                <StyledPPrice>{product.product_price}</StyledPPrice>
                <StyledBtnRemove
                  onClick={() => dispatch(removeProductFromOrder(product.id))}
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
      </StyledBoxOrder>
    </Layout>
  );
};

export default NewOrderPage;
