import Layout from '@/components/_shared/navigation/Layout';
import RowList from '@/components/_shared/ui/RowList';
import {
  StyledBoxBtns,
  StyledBtnArrow,
  StyledBtnIcon,
  StyledTable,
  StyledTbody,
  StyledTd,
  StyledTdEmpty,
  StyledTh,
  StyledThead,
  StyledTr,
} from '@/components/_shared/ui/Table.css';
import { NextPage } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faTrash,
  faArrowDown,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { useFetchProductsQuery } from '@/store/apis/productApi';

const ProductsPage: NextPage = () => {
  const router = useRouter();

  const { data: products } = useFetchProductsQuery({ page: 1 });

  const sortParam = router.query.sort;
  const pageParam = Number(router.query.page);
  const searchParam = router.query.search as string;
  const wayParam: string = router.query.way ? String(router.query.way) : '';

  const updateSortParams = (value: string) => {
    if (router.query.sort === value) {
      router.query.way = wayParam === 'asc' ? 'desc' : 'asc';
    } else {
      router.query.way = 'asc';
    }

    router.query.sort = value;
    router.push(router);
  };
  return (
    <Layout>
      <RowList btnText='Add new product' onClick={() => console.log('ok')} />
      <StyledTable>
        <StyledThead>
          <StyledTr>
            <StyledTh>Product number </StyledTh>
            <StyledTh>
              Product name
              <StyledBtnArrow
                color={sortParam === 'name' ? '#fff' : '#aaa'}
                wayUp={sortParam === 'name' && wayParam === 'asc'}
                onClick={() => updateSortParams('name')}
              >
                <FontAwesomeIcon icon={faArrowDown} />
              </StyledBtnArrow>
            </StyledTh>
            <StyledTh>
              Category
              <StyledBtnArrow
                color={sortParam === 'category' ? '#fff' : '#aaa'}
                wayUp={sortParam === 'category' && wayParam === 'asc'}
                onClick={() => updateSortParams('category')}
              >
                <FontAwesomeIcon icon={faArrowDown} />
              </StyledBtnArrow>
            </StyledTh>
            <StyledTh>
              Price
              <StyledBtnArrow
                color={sortParam === 'price' ? '#fff' : '#aaa'}
                wayUp={sortParam === 'price' && wayParam === 'asc'}
                onClick={() => updateSortParams('price')}
              >
                <FontAwesomeIcon icon={faArrowDown} />
              </StyledBtnArrow>
            </StyledTh>
            <StyledTh>Actions</StyledTh>
          </StyledTr>
        </StyledThead>
        <StyledTbody>
          {!products?.data.length && (
            <StyledTr>
              <StyledTdEmpty>No products</StyledTdEmpty>
            </StyledTr>
          )}
          {Boolean(products?.data.length) &&
            products?.data.map((product, i) => (
              <StyledTr key={product.id}>
                <StyledTd>{i + 1}</StyledTd>
                <StyledTd>{product.product_name}</StyledTd>
                <StyledTd>{product.product_category}</StyledTd>
                <StyledTd>{product.product_price}</StyledTd>
                <StyledTd>
                  <StyledBoxBtns>
                    <StyledBtnIcon
                      onClick={() => router.push(`/products/${product.id}`)}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </StyledBtnIcon>
                    <StyledBtnIcon
                      onClick={() =>
                        router.push(`/products/${product.id}/edit`)
                      }
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </StyledBtnIcon>
                    {/* <StyledBtnIcon onClick={() => setElementToConfirm(product)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </StyledBtnIcon> */}
                    <StyledBtnIcon></StyledBtnIcon>
                  </StyledBoxBtns>
                </StyledTd>
              </StyledTr>
            ))}
        </StyledTbody>
      </StyledTable>
    </Layout>
  );
};

export default ProductsPage;
