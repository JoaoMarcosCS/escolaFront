// aqui é onde terá as ações relacionandas a uma entidade

import * as types from '../types';

export function clicaBotaoRequest() {
  // usando um arquivo que contém os tipos, nós podemos retornar os valores para cada ação
  return {
    type: types.BOTAO_CLICADO_REQUEST,
  };
}

export function clicaBotaoSuccess() {
  return {
    type: types.BOTAO_CLICADO_SUCCESS,
  };
}

export function clicaBotaoFailed() {
  return {
    type: types.BOTAO_CLICADO_FAILED,
  };
}
