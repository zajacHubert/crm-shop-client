import Layout from '@/components/_shared/navigation/Layout';
import {
  StyledBoxEmail,
  StyledBoxIcon,
  StyledBoxUser,
  StyledBtnEdit,
  StyledContainer,
  StyledRowOrders,
  StyledRowUser,
  StyledTextEmail,
  StyledTextName,
  StyledTextRole,
  StyledBoxBtns,
  StyledTextDelete,
} from '@/components/users/SingleUserPage.css';
import { useDeleteUserMutation, useFetchUserQuery } from '@/store/apis/userApi';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { StyledBtnRemove } from '@/components/_shared/ui/ButtonRemove.css';
import { RootState } from '@/store';
import PopupConfirmDelete from '@/components/_shared/ui/PopupConfirmDelete';
import { openPopup, setId } from '@/store/slices/popupSlice';
import { displaySnackBar } from '@/utils/displaySnackBar';
import Snackbar from '@/components/_shared/ui/Snackbar';

const SingleUserPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const id = router.query.id as string;
  const { data } = useFetchUserQuery(id);
  const isPopupOpen = useSelector((state: RootState) => state.popup.isOpen);
  const isSnackBarOpen = useSelector(
    (state: RootState) => state.snackbar.isOpen
  );
  const [deleteUser, { isLoading, isSuccess }] = useDeleteUserMutation();

  const removeUser = () => {
    dispatch(setId(id));
    dispatch(openPopup());
  };

  if (isSuccess) {
    displaySnackBar(dispatch, true, 'User has been deleted');
    setTimeout(() => {
      router.push('/users?page=1');
    }, 2000);
  }

  return (
    <>
      {isPopupOpen && <PopupConfirmDelete deleteFunction={deleteUser} />}
      {isSnackBarOpen && <Snackbar />}
      <Layout>
        <StyledContainer>
          {isSnackBarOpen ? (
            <StyledTextDelete>User has been deleted</StyledTextDelete>
          ) : (
            <>
              <StyledRowUser>
                <StyledBoxIcon>
                  <FontAwesomeIcon icon={faUser} />
                </StyledBoxIcon>
                <StyledBoxUser>
                  <StyledTextName>{data?.name}</StyledTextName>
                  <StyledBoxEmail>
                    <FontAwesomeIcon icon={faEnvelope} />
                    <StyledTextEmail>{data?.email}</StyledTextEmail>
                  </StyledBoxEmail>
                  <StyledTextRole>{data?.role.role_name}</StyledTextRole>
                  <StyledBoxBtns>
                    <StyledBtnEdit>Edit</StyledBtnEdit>
                    <StyledBtnRemove onClick={removeUser}>
                      Delete
                    </StyledBtnRemove>
                  </StyledBoxBtns>
                </StyledBoxUser>
              </StyledRowUser>
              <StyledRowOrders>Orders</StyledRowOrders>
            </>
          )}
        </StyledContainer>
      </Layout>
    </>
  );
};

export default SingleUserPage;
