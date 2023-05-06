import { RootState } from '@/store';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyledBtnIcon,
  StyledContainerSnackbar,
  StyledPMessage,
} from './Snackbar.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { closeSnackbar } from '@/store/slices/snackbarSlice';

const Snackbar: FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.snackbar.isOpen);
  const message = useSelector((state: RootState) => state.snackbar.message);
  const success = useSelector((state: RootState) => state.snackbar.success);

  let timer: ReturnType<typeof setTimeout>;
  const handleClose = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      dispatch(closeSnackbar());
    }, 3000);
  };

  useEffect(() => {
    if (isOpen) {
      handleClose();
    }
  }, [isOpen, dispatch]);

  return (
    <StyledContainerSnackbar success={success} isOpen={isOpen}>
      <StyledPMessage>{message}</StyledPMessage>
      <StyledBtnIcon onClick={() => dispatch(closeSnackbar())}>
        <FontAwesomeIcon icon={faXmark} />
      </StyledBtnIcon>
    </StyledContainerSnackbar>
  );
};

export default Snackbar;
