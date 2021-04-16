/* eslint-disable linebreak-style */

import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
 :root{
   --blue: #00a1fe;
  }
  * {
    box-sizing: border-box;
  }
  ${normalize}  // chamanda da lib "normalize" que deixa o css padrao pra qualquer navegador
  html,
  body { // reset page
    margin: 0;
    padding: 0;
    font-family: Helvetica, Arial, sans-serif;
  }
  /* Full height layout */
  html, body {
    display: flex;
    min-height: 100vh;
    width: 100%;
  }
  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

export default GlobalStyle;
