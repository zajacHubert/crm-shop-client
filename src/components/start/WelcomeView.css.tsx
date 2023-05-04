import styled from 'styled-components';

export const StyledContainerMain = styled.div`
  display: flex;
  align-items: center;
  width: 900px;
  height: 300px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.lightGray};
  margin-top: 100px;
`;

export const StyledBoxText = styled.div`
  width: 50%;
  padding: 0 50px;
`;

export const StyledText = styled.h2`
  text-align: center;
  line-height: 50px;
  font-size: 32px;
  font-weight: 700;
`;

export const StyledBoxImg = styled.div`
  width: 50%;
  height: 300px;
`;
