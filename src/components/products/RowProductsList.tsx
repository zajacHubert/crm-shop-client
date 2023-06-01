import { useRouter } from 'next/router';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { countOrderValue } from '@/utils/counteOrderValue';

import {
  StyledBoxText,
  StyledBtnOrder,
  StyledContainerOrder,
  StyledPOrderElement,
  StyledRow,
  StyledSpan,
} from './RowProductsList.css';
import ButtonAdd from '../_shared/ui/ButtonAdd';

const RowProductsList: FC = () => {
  const router = useRouter();
  const orderedProduts = useSelector(
    (state: RootState) => state.order.orderedProducts
  );
  const orderValue = orderedProduts.length
    ? countOrderValue(orderedProduts)
    : 0;

  const loggedUser = useSelector(
    (state: RootState) => state.user.auth?.user_logged
  );

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
      {loggedUser?.role.role_name !== 'client' && (
        <ButtonAdd onClick={() => router.push('/products/new')}>
          Add product
        </ButtonAdd>
      )}
    </StyledRow>
  );
};

export default RowProductsList;
