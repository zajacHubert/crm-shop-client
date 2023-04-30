import { ChangeEvent, FC } from 'react';

import { StyledBoxSelect, StyledError, StyledSelect } from './Select.css';

interface SelectProps {
  id?: string;
  error?: string | false | undefined;
  name?: string;
  value?: string;
  align?: string;
  onChange: {
    (e: ChangeEvent<any>): void;
    <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any>
      ? void
      : (e: string | ChangeEvent<any>) => void;
  };
  options: string[];
  title: string;
}

const Select: FC<SelectProps> = ({
  id,
  error,
  name,
  value,
  onChange,
  title,
  options,
  align,
}) => {
  return (
    <>
      <StyledBoxSelect align={align ?? ''}>
        <StyledSelect
          id={id}
          name={name}
          value={value}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e)}
        >
          <option value=''>{title}</option>
          {options.map((option: any, i: number) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </StyledSelect>
      </StyledBoxSelect>
      <StyledError>{error}</StyledError>
    </>
  );
};

export default Select;
