/* eslint-disable no-console */
import axios from '../../../services/axios';
import * as types from '../types';

const initialState = {
  isLoggedIn: false,
  token: false,
  user: {},
  isLoading: false,
};

// eslint-disable-next-line default-param-last
export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS: {
      const newState = { ...state };
      newState.isLoggedIn = true;
      newState.token = action.payload.token;
      newState.user = action.payload.user;
      newState.isLoading = false;
      return newState;
    }
    case types.LOGIN_FAILED: {
      delete axios.defaults.headers.Authorization;
      const newState = { ...initialState };
      return newState; // retorna o state para o estado inicial, deslogando o user
    }

    case types.LOGIN_REQUEST: {
      const newState = { ...state };
      newState.isLoading = true;
      return newState;
    }
    case types.REGISTER_REQUEST: {
      console.log('Register request', action.payload);
      const newState = { ...state };
      newState.isLoading = true;
      return newState;
    }
    case types.REGISTER_FAILED: {
      console.log('Register failed', action.payload);
      const newState = { ...state };
      newState.isLoading = false;
      return newState;
    }
    case types.REGISTER_UPDATED_SUCCESS: {
      console.log('Register updated success', action.payload);
      const newState = { ...state };
      newState.user.nome = action.payload.nome;
      newState.user.email = action.payload.email;
      newState.isLoading = false;
      return newState;
    }
    case types.REGISTER_CREATED_SUCCESS: {
      console.log('Register created success', action.payload);
      const newState = { ...state };
      newState.isLoading = false;
      return newState;
    }

    default: {
      return state;
    }
  }
};
