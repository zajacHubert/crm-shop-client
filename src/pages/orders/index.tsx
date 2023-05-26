import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import {
  useDeleteOrderMutation,
  useFetchOrdersQuery,
} from '@/store/apis/orderApi';
import { formatDate } from '@/utils/formatDate';
import { countOrderValue } from '@/utils/counteOrderValue';
import { openPopup, setId } from '@/store/slices/popupSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye } from '@fortawesome/free-solid-svg-icons';

import Pagination from '@/components/_shared/ui/Pagination';
import PopupConfirmDelete from '@/components/_shared/ui/PopupConfirmDelete';
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

import {
  StyledBtn,
  StyledRow,
  StyledSelectSort,
  StyledText,
} from '@/components/orders/RowOrderList.css';
import { ChangeEvent, useEffect, useState } from 'react';
import Spinner from '@/components/_shared/ui/Spinner';

const OrdersPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isPopupOpen = useSelector((state: RootState) => state.popup.isOpen);

  const [sortValue, setSortValue] = useState('created_at');
  const [sortDirection, setSortDirection] = useState('asc');

  const pageParam = Number(router.query.page);
  const sortParam = router.query.sort_param as string;
  const directionParam = router.query.direction as string;

  const {
    data: orders,
    isLoading,
    isFetching,
  } = useFetchOrdersQuery({
    page: pageParam,
    sort_param: sortParam ?? '',
    direction: directionParam ?? '',
  });
  const [deleteFunction] = useDeleteOrderMutation();

  const removeOrder = (id: string) => {
    dispatch(setId(id));
    dispatch(openPopup());
  };

  const updateParams = () => {
    router.query.sort_param = sortValue;
    router.query.direction = sortDirection;
    router.push(router);
  };

  if (isLoading || isFetching) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  return (
    <>
      {isPopupOpen && <PopupConfirmDelete deleteFunction={deleteFunction} />}
      <Layout>
        <StyledRow>
          <StyledText>Sort orders by:</StyledText>
          <StyledSelectSort
            value={sortValue}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setSortValue(e.target.value)
            }
          >
            <option value='created_at'>Date</option>
            <option value='value'>Value</option>
          </StyledSelectSort>
          <StyledSelectSort
            value={sortDirection}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setSortDirection(e.target.value)
            }
          >
            <option value='asc'>Ascending</option>
            <option value='desc'>Descending</option>
          </StyledSelectSort>
          <StyledBtn onClick={updateParams}>Show sorted</StyledBtn>
        </StyledRow>
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
                <StyledTdEmpty>No orders</StyledTdEmpty>
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
