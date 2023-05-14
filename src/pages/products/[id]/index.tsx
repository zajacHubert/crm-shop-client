import Image from 'next/image';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { useFetchProductQuery } from '@/store/apis/productApi';
import { addProductToOrder } from '@/store/slices/orderSlice';
import Layout from '@/components/_shared/navigation/Layout';
import { StyledBtnBuy } from '@/components/_shared/ui/Table.css';
import {
  StyledBoxBtns,
  StyledBoxDesc,
  StyledBoxImg,
  StyledContainerProduct,
  StyledPDesc,
  StyledPPrice,
  StyledTitleProduct,
} from '@/components/products/SingleProductPage.css';

const SingleProductPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const id = router.query.id as string;
  const { data } = useFetchProductQuery(id);

  const handleBuy = () => {
    dispatch(addProductToOrder(data!));
    router.push('/products?page=1');
  };

  return (
    <Layout>
      <StyledContainerProduct>
        <StyledTitleProduct>{data?.product_name}</StyledTitleProduct>
        <StyledBoxImg>
          <Image
            src='/placeholder.png'
            alt='product photo'
            width={400}
            height={300}
          />
        </StyledBoxImg>
        <StyledBoxDesc>
          <StyledPDesc>{data?.product_desc}</StyledPDesc>
          <StyledPPrice>Price: {data?.product_price}</StyledPPrice>
        </StyledBoxDesc>
        <StyledBoxBtns>
          <StyledBtnBuy onClick={handleBuy}>Buy</StyledBtnBuy>
        </StyledBoxBtns>
      </StyledContainerProduct>
    </Layout>
  );
};

export default SingleProductPage;
