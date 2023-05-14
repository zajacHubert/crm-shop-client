import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import {
  useDeleteUserMutation,
  useFetchUsersQuery,
} from '@/store/apis/userApi';
import { openPopup, setId } from '@/store/slices/popupSlice';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateSortParams } from '@/utils/updateSortParams';

import { User } from '@/types/user';
import RowUsersList from '@/components/users/RowUsersList';
import Layout from '@/components/_shared/navigation/Layout';
import Pagination from '@/components/_shared/ui/Pagination';
import PopupConfirmDelete from '@/components/_shared/ui/PopupConfirmDelete';
import Snackbar from '@/components/_shared/ui/Snackbar';
import {
  faPen,
  faTrash,
  faArrowDown,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
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

const UsersPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isPopupOpen = useSelector((state: RootState) => state.popup.isOpen);
  const isSnackBarOpen = useSelector(
    (state: RootState) => state.snackbar.isOpen
  );
  const [deleteUser] = useDeleteUserMutation();
  const sortParam = router.query.sort;
  const pageParam = Number(router.query.page);
  const wayParam: string = router.query.way ? String(router.query.way) : '';

  const {
    data: users,
    isLoading,
    isSuccess,
    isFetching,
    refetch,
  } = useFetchUsersQuery({ page: pageParam });

  useEffect(() => {
    if (!isLoading || isSuccess) {
      if (sortParam) {
        const way = wayParam === 'asc' ? 'asc' : 'desc';
        setSortedUsers(_.orderBy(users?.data!, [String(sortParam)], way));
      } else {
        setSortedUsers(users?.data!);
      }
    }
  }, [isLoading, isSuccess, sortParam, wayParam, users?.data!]);
  const [sortedUsers, setSortedUsers] = useState<User[]>([]);

  const removeUser = (id: string) => {
    dispatch(setId(id));
    dispatch(openPopup());
  };

  if (isLoading || isFetching) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  return (
    <>
      {isPopupOpen && <PopupConfirmDelete deleteFunction={deleteUser} />}
      {isSnackBarOpen && <Snackbar />}

      <Layout>
        <RowUsersList />
        <StyledTable>
          <StyledThead>
            <StyledTr>
              <StyledTh>User number</StyledTh>
              <StyledTh>
                Name
                <StyledBtnArrow
                  color={sortParam === 'name' ? '#fff' : '#aaa'}
                  wayUp={sortParam === 'name' && wayParam === 'asc'}
                  onClick={() => updateSortParams(router, 'name', wayParam)}
                >
                  <FontAwesomeIcon icon={faArrowDown} />
                </StyledBtnArrow>
              </StyledTh>
              <StyledTh>
                Email
                <StyledBtnArrow
                  color={sortParam === 'email' ? '#fff' : '#aaa'}
                  wayUp={sortParam === 'email' && wayParam === 'asc'}
                  onClick={() => updateSortParams(router, 'email', wayParam)}
                >
                  <FontAwesomeIcon icon={faArrowDown} />
                </StyledBtnArrow>
              </StyledTh>
              <StyledTh>
                Role
                <StyledBtnArrow
                  color={sortParam === 'role.role_name' ? '#fff' : '#aaa'}
                  wayUp={sortParam === 'role.role_name' && wayParam === 'asc'}
                  onClick={() =>
                    updateSortParams(router, 'role.role_name', wayParam)
                  }
                >
                  <FontAwesomeIcon icon={faArrowDown} />
                </StyledBtnArrow>
              </StyledTh>
              <StyledTh>Actions</StyledTh>
            </StyledTr>
          </StyledThead>
          <StyledTbody>
            {!sortedUsers.length && !isLoading && (
              <StyledTr>
                <StyledTdEmpty>No products</StyledTdEmpty>
              </StyledTr>
            )}
            {Boolean(sortedUsers.length && !isLoading) &&
              sortedUsers?.map((user, i) => (
                <StyledTr key={user.id}>
                  <StyledTd>{i + 1 + (pageParam - 1) * 10}</StyledTd>
                  <StyledTd>{user.name}</StyledTd>
                  <StyledTd>{user.email}</StyledTd>
                  <StyledTd>{user.role.role_name}</StyledTd>
                  <StyledTd>
                    <StyledBoxBtns>
                      <StyledBtnIcon
                        onClick={() => router.push(`/users/${user.id}`)}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </StyledBtnIcon>
                      <StyledBtnIcon
                        onClick={() => router.push(`/users/${user.id}/edit`)}
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </StyledBtnIcon>
                      <StyledBtnIcon onClick={() => removeUser(user.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </StyledBtnIcon>
                    </StyledBoxBtns>
                  </StyledTd>
                </StyledTr>
              ))}
          </StyledTbody>
        </StyledTable>
        <Pagination listLength={users?.total! ?? 1} />
      </Layout>
    </>
  );
};

export default UsersPage;
