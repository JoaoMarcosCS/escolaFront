import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actions from './actions';
import * as types from '../types';

const requisicao = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

function* exempleRequest() {
  try {
    yield call(requisicao);
    yield put(actions.clicaBotaoSuccess());
  } catch (e) {
    toast.error('Erro na requisição');
    yield put(actions.clicaBotaoFailed());
  }
}
// Aqui nós iremos escutar a ação botao_clicado-request e assim que foi acionada, chama a função exempleRequest
export default all([takeLatest(types.BOTAO_CLICADO_REQUEST, exempleRequest)]);
