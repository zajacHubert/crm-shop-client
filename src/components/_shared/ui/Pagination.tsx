import { useRouter } from "next/router";
import { FC } from "react";

import { StyledRowPagination, StyledButton } from "./Pagination.css";

interface PaginationProps {
  listLength: number;
}

export const Pagination: FC<PaginationProps> = ({ listLength }) => {
  const router = useRouter();
  const { page } = router.query;
  const btnsNumber = listLength > 10 ? Math.ceil(listLength / 10) : 1;

  return (
    <StyledRowPagination>
      {[...Array(btnsNumber)].map((el, i) => (
        <StyledButton
          key={i}
          onClick={() => {
            router.query.page = String(i + 1);
            router.push(router);
          }}
          style={{
            color: `${i + 1 === Number(page) ? "#603582" : "#000"}`,
            opacity: `${i + 1 === Number(page) ? "1" : "0.5"}`,
            border: `${
              i + 1 === Number(page)
                ? "1px solid #603582 "
                : "1px solid #e5e5e5"
            }`,
          }}
        >
          {i + 1}
        </StyledButton>
      ))}
    </StyledRowPagination>
  );
};

export default Pagination;
