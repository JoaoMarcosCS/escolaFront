/* eslint-disable no-console */
import * as types from '../types';

const initialState = {
  botaoClicado: false,
};

// eslint-disable-next-line default-param-last
export default (state = initialState, action) => {
  switch (action.type) {
    case types.BOTAO_CLICADO_SUCCESS: {
      console.log('Requisição feita com sucesso.');
      const newState = { ...state };
      newState.botaoClicado = !newState.botaoClicado; // pega o estado oposto ao atual
      return newState;
    }
    case types.BOTAO_CLICADO_FAILED: {
      console.log('Erro ao realizar a requisição...');
      return state;
    }
    case types.BOTAO_CLICADO_REQUEST: {
      console.log('Realizando requisição...');
      return state;
    }
    default: {
      return state;
    }
  }
};
