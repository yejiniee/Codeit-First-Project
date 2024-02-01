/* eslint-disable import/no-extraneous-dependencies */
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
${reset}
  * {
    box-sizing: border-box;
    
  }

  html {
    font-size: 62.5%;
    background-color: ${({ theme }) => theme.colorGrayScale20};
  }

  body {
    font-family: Pretendard;
    margin: 0 auto;
  }

  :root {
    /* Color */
    --color-grayscale-10: #FFFFFF;
    --color-grayscale-20: #F9F9F9;
    --color-grayscale-30: #CFCFCF;
    --color-grayscale-40: #818181;
    --color-grayscale-50: #515151;
    --color-grayscale-60: #000000;

    --color-brown-10: #F5F1EE;
    --color-brown-20: #E4D5C9;
    --color-brown-30: #C7BBB5;
    --color-brown-40: #542F1A;
    --color-brown-50: #341909;

    --color-blue-20: #ABD0E5;

    --color-blue-50: #1877F2;
    --color-yellow-50: #FEE500;
    --color-red-50: #B93333;

    /* Font Size */
    --font-h1: 40px;
    --font-h2: 32px;
    --font-h3: 24px;

    --font-body1: 20px;
    --font-body2: 18px;
    --font-body3: 16px;
    
    --font-caption1: 14px;

    /* Font Weight */
    --weight-bold: 700;
    --weight-medium: 500;
    --weight-regular: 400;

    /* Box Shadow */
    --shadow-1pt: 0px 4px 4px 0px rgba(140, 140, 140, 0.25);
    --shadow-2pt: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    --shadow-3pt: 0px 16px 20px 0px rgba(48, 48, 48, 0.62);

  }
`;
export default GlobalStyle;
