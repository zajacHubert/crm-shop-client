import styled from 'styled-components';

const StyledSpinnerContainer = styled.div`
  height: 450px;
  width: 100%;
  display: grid;
  place-items: center;
`;

const StyledSpinner = styled.div`
  border: 16px solid ${({ theme }) => theme.gray};
  border-top: 16px ${({ theme }) => theme.secondary} solid;
  border-radius: 50%;
  height: 120px;
  width: 120px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

const Spinner = () => {
  return (
    <StyledSpinnerContainer>
      <StyledSpinner />
    </StyledSpinnerContainer>
  );
};

export default Spinner;
