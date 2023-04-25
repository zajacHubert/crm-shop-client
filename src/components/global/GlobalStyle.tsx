import React from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');

* {
    margin:0;
    padding:0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
}

ul {
    list-style: none;
}

a {
    text-decoration: none;
    color: inherit;
}

img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

button {
    cursor: pointer;
    border: none;
    outline: none;
}    
`;

export default GlobalStyle;
