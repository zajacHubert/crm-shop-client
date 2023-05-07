import Layout from '@/components/_shared/navigation/Layout';
import PopupConfirmDelete from '@/components/_shared/ui/PopupConfirmDelete';
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
import { RootState } from '@/store';
import {
  useDeleteOrderMutation,
  useFetchOrderQuery,
} from '@/store/apis/orderApi';
import { openPopup, setId } from '@/store/slices/popupSlice';
import { Product } from '@/types/product';
import { countOrderValue } from '@/utils/counteOrderValue';
import { formatDate } from '@/utils/formatDate';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { identifierToKeywordKind } from 'typescript';

const SingleOrderPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const id = router.query.id as string;
  const { data } = useFetchOrderQuery(id);
  const isPopupOpen = useSelector((state: RootState) => state.popup.isOpen);
  const [deleteFunction, { isSuccess }] = useDeleteOrderMutation();

  const removeOrder = (id: string) => {
    dispatch(setId(id));
    dispatch(openPopup());
    if (isSuccess) {
      router.back();
    }
  };

  return (
    <>
      {isPopupOpen && <PopupConfirmDelete deleteFunction={deleteFunction} />}
      <Layout>
        <StyledContainerOrder>
          <StyledTitleOrder>
            {data?.user.name} - {formatDate(data?.created_at!)}
          </StyledTitleOrder>
          <StyledPInfo>{data?.user.email}</StyledPInfo>
          <StyledPTotal>
            Total: {countOrderValue(data?.products ?? [])}
          </StyledPTotal>
          <StyledPInfo>Ordered products:</StyledPInfo>
          <StyledList>
            {data?.products.map((product: Product) => (
              <StyledListItem key={product.id}>
                {product.product_name} - {product.product_price}
              </StyledListItem>
            ))}
          </StyledList>
          <StyledBtnBack onClick={() => router.back()}>Back</StyledBtnBack>
          <StyledBtnRemove onClick={() => removeOrder(id)}>
            Remove Order
          </StyledBtnRemove>
        </StyledContainerOrder>
      </Layout>
    </>
  );
};

export default SingleOrderPage;
