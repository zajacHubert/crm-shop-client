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
import { countOrderValue } from '@/utils/counteOrderValue';

const RowProductsList: FC = () => {
  const router = useRouter();
  const orderedProduts = useSelector(
    (state: RootState) => state.order.orderedProducts
  );
  const orderValue = orderedProduts.length
    ? countOrderValue(orderedProduts)
    : 0;
  return (
    <StyledRow>
      <StyledContainerOrder>
        {orderedProduts.length ? (
          <>
            <StyledBoxText>
              <StyledPOrderElement>
                Ordered products:
                <StyledSpan>{orderedProduts.length}</StyledSpan>
              </StyledPOrderElement>
              <StyledPOrderElement>
                Order value: <StyledSpan>{orderValue}</StyledSpan>
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
      <ButtonAdd onClick={() => router.push('/products/new')}>
        Add product
      </ButtonAdd>
    </StyledRow>
  );
};

export default RowProductsList;
