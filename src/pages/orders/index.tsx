import Layout from '@/components/_shared/navigation/Layout';
import {
  StyledBoxBtns,
  StyledBtnIcon,
  StyledTable,
  StyledTbody,
  StyledTd,
  StyledTdEmpty,
  StyledTh,
  StyledThead,
  StyledTr,
} from '@/components/_shared/ui/Table.css';
import { RootState } from '@/store';
import {
  useDeleteOrderMutation,
  useFetchOrdersQuery,
} from '@/store/apis/orderApi';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import { countOrderValue } from '@/utils/counteOrderValue';
import Pagination from '@/components/_shared/ui/Pagination';
import { formatDate } from '@/utils/formatDate';
import { openPopup, setId } from '@/store/slices/popupSlice';
import PopupConfirmDelete from '@/components/_shared/ui/PopupConfirmDelete';

const OrdersPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isPopupOpen = useSelector((state: RootState) => state.popup.isOpen);
  const pageParam = Number(router.query.page);

  const { data: orders, isLoading } = useFetchOrdersQuery({ page: pageParam });
  const [deleteFunction] = useDeleteOrderMutation();

  const removeOrder = (id: string) => {
    dispatch(setId(id));
    dispatch(openPopup());
  };

  return (
    <>
      {isPopupOpen && <PopupConfirmDelete deleteFunction={deleteFunction} />}
      <Layout>
        <StyledTable>
          <StyledThead>
            <StyledTr>
              <StyledTh>Order number</StyledTh>
              <StyledTh>Date of order</StyledTh>
              <StyledTh>User</StyledTh>
              <StyledTh>Order value</StyledTh>
              <StyledTh>Actions</StyledTh>
            </StyledTr>
          </StyledThead>
          <StyledTbody>
            {!orders?.data.length && !isLoading && (
              <StyledTr>
                <StyledTdEmpty>No products</StyledTdEmpty>
              </StyledTr>
            )}
            {Boolean(orders?.data.length && !isLoading) &&
              orders?.data.map((order, i) => (
                <StyledTr key={order.id}>
                  <StyledTd>{i + 1 + (pageParam - 1) * 10}</StyledTd>
                  <StyledTd>{formatDate(order.created_at)}</StyledTd>
                  <StyledTd>{order.user.name}</StyledTd>
                  <StyledTd>{countOrderValue(order.products!)}</StyledTd>
                  <StyledTd>
                    <StyledBoxBtns>
                      <StyledBtnIcon
                        onClick={() => router.push(`/orders/${order.id}`)}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </StyledBtnIcon>
                      <StyledBtnIcon onClick={() => removeOrder(order.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </StyledBtnIcon>
                    </StyledBoxBtns>
                  </StyledTd>
                </StyledTr>
              ))}
          </StyledTbody>
        </StyledTable>
        <Pagination listLength={orders?.total!}></Pagination>
      </Layout>
    </>
  );
};

export default OrdersPage;
