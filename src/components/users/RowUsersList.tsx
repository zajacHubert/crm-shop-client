import { useRouter } from 'next/router';
import { FC } from 'react';

import { StyledRow } from './RowUsersList.css';
import ButtonAdd from '../_shared/ui/ButtonAdd';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const RowUsersList: FC = () => {
  const router = useRouter();
  const loggedUser = useSelector(
    (state: RootState) => state.user.auth?.user_logged
  );
  return (
    <StyledRow>
      {loggedUser?.role.role_name !== 'client' && (
        <ButtonAdd
          onClick={() => {
            router.push('/users/new');
          }}
        >
          Add new user
        </ButtonAdd>
      )}
    </StyledRow>
  );
};

export default RowUsersList;
