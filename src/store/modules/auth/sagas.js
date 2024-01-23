/* eslint-disable require-yield */
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import * as types from '../types';
import * as actions from './actions';
import axios from '../../../services/axios';
import history from '../../../services/history';

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/tokens', payload);
    yield put(actions.loginSuccess({ ...response.data })); // manda uma action para ser capturada no reducer

    toast.success('Login realizado com sucesso!');

    // colocando o token no athorization do header
    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    history.push(payload.prevPath);
  } catch (error) {
    toast.error('Usuário ou senha inválida');
    yield put(actions.loginFailed());
  }
}

// essa função vai garantir que o user continue tendo autorização para acessar rotas fechadas
// pois se ele atualizasse a pagina, o token de autorização iria se perder e ele perderia o acesso
function persistRehydrate({ payload }) {
  // o payload contém o estado completo da aplicação, então no segundo parametro nós dizemos qual módulo de estado nós queremos
  const token = get(payload, 'auth.token', '');

  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

// eslint-disable-next-line consistent-return
function* registerRequest({ payload }) {
  const { id, nome, email, password } = payload;

  try {
    if (id) {
      yield call(axios.put, '/users', {
        email,
        nome,
        password: password || undefined,
      });
      toast.success('Informações alteradas! ');
      yield put(actions.registerUpdatedSuccess({ nome, email, password }));
    } else {
      yield call(axios.post, '/users', {
        email,
        nome,
        password,
      });
      toast.success('Cadastrado com sucesso! ');
      // não acionamos nenhuma action pois o usuario não foi logado então se pode ter dados no state
      yield put(actions.registerCreatedSuccess({ nome, email, password }));
      history.push('/login');
    }
  } catch (e) {
    const errors = get(e, 'response.data.errors', []);
    const status = get(e, 'response.status', 0);

    if (status === 401) {
      toast.info(
        'Após alterar o email, necessário fazer login novamente com seu novo email'
      );
      yield put(actions.loginFailed());
      return history.push('/login');
    }

    if (errors.length > 0) {
      errors.map((error) => toast.error(error));
    } else {
      toast.error('Erro desconhecido');
    }

    return yield put(actions.registerFailed());
  }
}

// Aqui nós iremos escutar a ação botao_clicado-request e assim que foi acionada, chama a função exempleRequest
export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
