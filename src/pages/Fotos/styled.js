import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Title = styled.h1`
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;

  label {
    width: 180px;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eee;
    border: 5px dashed ${colors.primaryColor};
    cursor: pointer;
    border-radius: 50%;
    overflow: hidden;
  }

  input {
    display: none;
  }
`;
