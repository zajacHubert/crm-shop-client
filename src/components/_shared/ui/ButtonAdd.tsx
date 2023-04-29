import React, { FC } from 'react';

import { StyledButtonAdd } from './ButtonAdd.css';

interface ButtonAddProps {
  children: string;
  onClick: () => void;
}

const ButtonAdd: FC<ButtonAddProps> = ({ children, onClick }) => {
  return <StyledButtonAdd onClick={onClick}>{children}</StyledButtonAdd>;
};

export default ButtonAdd;
