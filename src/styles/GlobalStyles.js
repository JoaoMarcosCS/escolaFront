import styled, { createGlobalStyle } from 'styled-components';
import * as colors from '../config/colors';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
  }

  body{
    font-family: sans-serif;
    background-color: ${colors.primaryDarkColor};
  }

  html,#root, body{
    height: 100%;
  }

  button{
    cursor: pointer;
    background-color: ${colors.primaryColor};
    border:none;
    color: #fff;
    padding: 10px 20px;
    border-radius:6px;
    font-weight: 700;
    transition:all ease 0.3s;
  }
  button:hover{
    filter:brightness(85%);
  }
  a{
    text-decoration: none;
    color:${colors.primaryColor}
  }

  ul{
    list-style: none;
  }
/*
  body .Toastify .Toastify__toast-container .Toastify__toast--success {
    background-color: ${colors.successColor};
}

body .Toastify .Toastify__toast-container .Toastify__toast--error {
    background-color: ${colors.errorColor};
} */


`;

export const Container = styled.section`
  max-width: 480px;
  background-color: #fff;
  margin: 30px auto;
  padding: 30px;
  border-radius: 6px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
