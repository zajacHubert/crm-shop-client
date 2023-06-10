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
import Spinner from '@/components/_shared/ui/Spinner';

const UsersPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isPopupOpen = useSelector((state: RootState) => state.popup.isOpen);
  const isSnackBarOpen = useSelector(
    (state: RootState) => state.snackbar.isOpen
  );
  const [deleteUser] = useDeleteUserMutation();

  const sortParam = router.query.sort_param as string;
  const pageParam = Number(router.query.page);
  const directionParam = router.query.direction as string;

  const [sortValue, setSortValue] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<string>('');

  const {
    data: users,
    isLoading,
    isFetching,
    refetch,
  } = useFetchUsersQuery({
    page: pageParam,
    sort_param: sortParam ?? '',
    direction: directionParam ?? '',
  });

  const removeUser = (id: string) => {
    dispatch(setId(id));
    dispatch(openPopup());
  };

  useEffect(() => {
    router.query.sort_param = sortValue;
    router.query.direction = sortDirection;
    if (!router.query.sort_param) {
      delete router.query.sort_param;
    }
    if (!router.query.direction) {
      delete router.query.direction;
    }
    router.push(router);
  }, [sortValue, sortDirection]);

  useEffect(() => {
    refetch();
  }, [users]);

  if (isLoading || isFetching) {
    return (
      <Layout>
        <Spinner />
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
                  color={sortValue === 'name' ? '#fff' : '#aaa'}
                  wayUp={sortValue === 'name' && sortDirection === 'asc'}
                  onClick={() => {
                    setSortValue('name');
                    setSortDirection(
                      `${
                        sortValue === 'name' && sortDirection === 'asc'
                          ? 'desc'
                          : 'asc'
                      }`
                    );
                  }}
                >
                  <FontAwesomeIcon icon={faArrowDown} />
                </StyledBtnArrow>
              </StyledTh>
              <StyledTh>
                Email
                <StyledBtnArrow
                  color={sortValue === 'email' ? '#fff' : '#aaa'}
                  wayUp={sortValue === 'email' && sortDirection === 'asc'}
                  onClick={() => {
                    setSortValue('email');
                    setSortDirection(
                      `${
                        sortValue === 'email' && sortDirection === 'asc'
                          ? 'desc'
                          : 'asc'
                      }`
                    );
                  }}
                >
                  <FontAwesomeIcon icon={faArrowDown} />
                </StyledBtnArrow>
              </StyledTh>
              <StyledTh>Role</StyledTh>
              <StyledTh>Actions</StyledTh>
            </StyledTr>
          </StyledThead>
          <StyledTbody>
            {!users?.data?.length && !isLoading && (
              <StyledTr>
                <StyledTdEmpty>No users</StyledTdEmpty>
              </StyledTr>
            )}
            {Boolean(users?.data?.length && !isLoading) &&
              users?.data?.map((user, i) => (
                <StyledTr key={user.id}>
                  <StyledTd>{i + 1 + (pageParam - 1) * 10}</StyledTd>
                  <StyledTd>{user.name}</StyledTd>
                  <StyledTd isLower={true}>{user.email}</StyledTd>
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
