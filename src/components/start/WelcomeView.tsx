import { FC } from 'react';
import Image from 'next/image';
import {
  StyledBoxImg,
  StyledBoxText,
  StyledContainerMain,
  StyledText,
} from './WelcomeView.css';

const WelcomeView: FC = () => {
  return (
    <StyledContainerMain>
      <StyledBoxText>
        <StyledText>Welcome to our store and enjoy your shopping!</StyledText>
      </StyledBoxText>
      <StyledBoxImg>
        <Image src='/shop.jpg' alt='shop' height={300} width={450} />
      </StyledBoxImg>
    </StyledContainerMain>
  );
};

export default WelcomeView;
