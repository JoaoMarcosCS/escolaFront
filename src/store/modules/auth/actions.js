// aqui é onde terá as ações relacionandas a uma entidade

import * as types from '../types';

export function loginRequest(payload) {
  // usando um arquivo que contém os tipos, nós podemos retornar os valores para cada ação
  return {
    type: types.LOGIN_REQUEST,
    payload,
  };
}

export function loginSuccess(payload) {
  return {
    type: types.LOGIN_SUCCESS,
    payload,
  };
}

export function loginFailed(payload) {
  return {
    type: types.LOGIN_FAILED,
    payload,
  };
}

export function registerRequest(payload) {
  return {
    type: types.REGISTER_REQUEST,
    payload,
  };
}
export function registerFailed(payload) {
  return {
    type: types.REGISTER_FAILED,
    payload,
  };
}
export function registerUpdatedSuccess(payload) {
  return {
    type: types.REGISTER_UPDATED_SUCCESS,
    payload,
  };
}
export function registerCreatedSuccess(payload) {
  return {
    type: types.REGISTER_CREATED_SUCCESS,
    payload,
  };
}
