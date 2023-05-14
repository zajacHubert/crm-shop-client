import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { closePopup } from '@/store/slices/popupSlice';

import {
  StyledBoxBtns,
  StyledBoxPopupConfirm,
  StyledBtnCancel,
  StyledBtnConfirm,
  StyledTextConfirm,
} from './PopupConfirmDelete.css';

interface PopupConfirmDelete {
  deleteFunction: any;
}

const PopupConfirmDelete: FC<PopupConfirmDelete> = ({ deleteFunction }) => {
  const dispatch = useDispatch();
  const id = useSelector((state: RootState) => state.popup.id);

  const handleConfirm = async () => {
    if (id) {
      await deleteFunction(id);
    }
    dispatch(closePopup());
  };

  const handleCancel = () => {
    dispatch(closePopup());
  };
  return (
    <StyledBoxPopupConfirm>
      <StyledTextConfirm>
        Are you sure you want to delete thie element?
      </StyledTextConfirm>
      <StyledBoxBtns>
        <StyledBtnConfirm onClick={handleConfirm}>Yes</StyledBtnConfirm>
        <StyledBtnCancel onClick={handleCancel}>No</StyledBtnCancel>
      </StyledBoxBtns>
    </StyledBoxPopupConfirm>
  );
};

export default PopupConfirmDelete;
