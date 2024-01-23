import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistReducers = persistReducer(
    {
      key: 'ESCOLA', // nome da chave no localhost
      storage,
      whitelist: ['auth'], // modulos(entidades) da aplicação que iremos salvar no localstorage
    },
    reducers
  );

  return persistReducers;
};
