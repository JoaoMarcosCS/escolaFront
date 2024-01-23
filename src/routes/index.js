import { Switch } from 'react-router-dom';
import { toast } from 'react-toastify';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';
import Alunos from '../pages/Alunos';
import Aluno from '../pages/Aluno';
import Register from '../pages/Register';
import Fotos from '../pages/Fotos';

import MyRoute from './MyRoute';

export default function Routes() {
  toast.success('Deu certo');
  toast.error('Deu certo');

  return (
    <Switch>
      {/* Usando rotas personalizadas com segurança de autenticação */}
      <MyRoute exact path="/" component={Alunos} isClosed={false} />
      <MyRoute exact path="/aluno/:id/edit" component={Aluno} isClosed />
      <MyRoute exact path="/aluno" component={Aluno} isClosed />
      <MyRoute exact path="/fotos/:id" component={Fotos} isClosed />
      <MyRoute exact path="/login/" component={Login} isClosed={false} />
      <MyRoute exact path="/register/" component={Register} isClosed={false} />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
