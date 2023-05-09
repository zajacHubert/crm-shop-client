import { StyledBoxBtns } from '@/components/products/SingleProductPage.css';
import {
  StyledBoxIcon,
  StyledBoxUser,
  StyledContainer,
  StyledRowOrders,
  StyledRowUser,
  StyledTextEmail,
  StyledTextName,
  StyledTextRole,
} from '@/components/users/SingleUserPage.css';
import { useFetchUserQuery } from '@/store/apis/userApi';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

const SingleUserPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const id = router.query.id as string;
  const { data } = useFetchUserQuery(id);
  console.log(data);
  return (
    <StyledContainer>
      <StyledRowUser>
        <StyledBoxIcon></StyledBoxIcon>
        <StyledBoxUser>
          <StyledTextName></StyledTextName>
          <StyledTextEmail></StyledTextEmail>
          <StyledTextRole></StyledTextRole>
          <StyledBoxBtns></StyledBoxBtns>
        </StyledBoxUser>
      </StyledRowUser>
      <StyledRowOrders>Orders</StyledRowOrders>
    </StyledContainer>
  );
};

export default SingleUserPage;
