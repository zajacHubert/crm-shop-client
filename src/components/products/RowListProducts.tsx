import { StyledRow } from './RowProductsList.css';
import ButtonAdd from '../_shared/ui/ButtonAdd';
import { FC } from 'react';

interface RowListProps {
  btnText: string;
  onClick: () => void;
}

const RowList: FC<RowListProps> = ({ btnText, onClick }) => {
  return (
    <StyledRow>
      <ButtonAdd onClick={onClick}>{btnText}</ButtonAdd>
    </StyledRow>
  );
};

export default RowList;
