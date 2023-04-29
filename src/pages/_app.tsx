import GlobalStyle from '@/components/global/GlobalStyle';
import { store } from '@/store';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { theme } from '../styles/theme';
import '../styles/fonts.css';
import { ThemeProvider } from 'styled-components';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  );
}
