import { FC } from 'react';
import { StyledRow } from './RowUsersList.css';
import ButtonAdd from '../_shared/ui/ButtonAdd';
import { useRouter } from 'next/router';

const RowUsersList: FC = () => {
  const router = useRouter();
  return (
    <StyledRow>
      <ButtonAdd
        onClick={() => {
          router.push('/users/new');
        }}
      >
        Add new user
      </ButtonAdd>
    </StyledRow>
  );
};

export default RowUsersList;
