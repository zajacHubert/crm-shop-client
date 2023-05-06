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
import { useFetchOrdersQuery } from '@/store/apis/orderApi';
import { Product } from '@/types/product';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faTrash,
  faArrowDown,
  faEye,
} from '@fortawesome/free-solid-svg-icons';

const OrdersPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isPopupOpen = useSelector((state: RootState) => state.popup.isOpen);
  const pageParam = Number(router.query.page);

  const { data: orders, isLoading } = useFetchOrdersQuery({ page: pageParam });

  const countOrderValue = (products: Product[]) => {
    const value = products.reduce(
      (prev, curr) => prev + Number(curr.product_price),
      0
    );
    return value.toFixed(2);
  };
  return (
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
                <StyledTd>{order.created_at}</StyledTd>
                <StyledTd>{order.user.name}</StyledTd>
                <StyledTd>{countOrderValue(order.products)}</StyledTd>
                <StyledTd>
                  <StyledBoxBtns>
                    <StyledBtnIcon
                      onClick={() => router.push(`/products/${order.id}`)}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </StyledBtnIcon>
                    <StyledBtnIcon
                      onClick={() => router.push(`/orders/${order.id}/edit`)}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </StyledBtnIcon>
                    <StyledBtnIcon>
                      <FontAwesomeIcon icon={faTrash} />
                    </StyledBtnIcon>
                  </StyledBoxBtns>
                </StyledTd>
              </StyledTr>
            ))}
        </StyledTbody>
      </StyledTable>
    </Layout>
  );
};

export default OrdersPage;
