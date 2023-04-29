import { StyledRow } from './RowList.css';
import SearchInput from './SearchInput';
import ButtonAdd from './ButtonAdd';
import { FC } from 'react';

interface RowListProps {
  btnText: string;
  onClick: () => void;
}

const RowList: FC<RowListProps> = ({ btnText, onClick }) => {
  return (
    <StyledRow>
      <SearchInput />
      <ButtonAdd onClick={onClick}>{btnText}</ButtonAdd>
    </StyledRow>
  );
};

export default RowList;
