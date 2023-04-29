import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { StyledBoxIcon, StyledBoxInput, StyledInput } from './SearchInput.css';

const SearchInput: FC = () => {
  const router = useRouter();
  const search = Boolean(router.query.search)
    ? String(router.query.search)
    : '';

  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    setInputValue(search);
  }, [search]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      delete router.query.search;
    } else {
      router.query.search = e.target.value;
    }
    router.push(router);
    setInputValue(e.target.value);
  };
  return (
    <StyledBoxInput>
      <StyledInput onChange={handleInputChange} value={inputValue} />
      <StyledBoxIcon>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </StyledBoxIcon>
    </StyledBoxInput>
  );
};

export default SearchInput;
