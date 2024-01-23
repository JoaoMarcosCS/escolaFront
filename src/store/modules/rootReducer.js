import { combineReducers } from 'redux';
import auth from './auth/reducer';

export default combineReducers({
  auth, // colocamos nome na chave para podermos acessa-la em um select de forma mais clara
});
