import {
  StyledBoxText,
  StyledBtnOrder,
  StyledContainerOrder,
  StyledPOrderElement,
  StyledRow,
  StyledSpan,
} from './RowProductsList.css';
import ButtonAdd from '../_shared/ui/ButtonAdd';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useRouter } from 'next/router';

const RowProductsList: FC = () => {
  const router = useRouter();
  const orderedProduts = useSelector(
    (state: RootState) => state.order.orderedProducts
  );
  const orderValue = orderedProduts.length
    ? orderedProduts.reduce(
        (prev, curr) => prev + Number(curr.product_price),
        0
      )
    : 0;
  return (
    <StyledRow>
      <StyledContainerOrder>
        {orderedProduts.length ? (
          <>
            <StyledBoxText>
              <StyledPOrderElement>
                Ordered products:{' '}
                <StyledSpan>{orderedProduts.length}</StyledSpan>
              </StyledPOrderElement>
              <StyledPOrderElement>
                Order value: <StyledSpan>{orderValue.toFixed(2)}</StyledSpan>
              </StyledPOrderElement>
            </StyledBoxText>
            <StyledBtnOrder onClick={() => router.push('/orders/new')}>
              Go to order
            </StyledBtnOrder>
          </>
        ) : (
          <StyledPOrderElement>No ordered products</StyledPOrderElement>
        )}
      </StyledContainerOrder>
      <ButtonAdd onClick={() => {}}>Add product</ButtonAdd>
    </StyledRow>
  );
};

export default RowProductsList;
