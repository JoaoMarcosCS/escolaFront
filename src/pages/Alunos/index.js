import { useEffect, useState } from 'react';
import { get } from 'lodash';
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamation,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';
import { AlunoContainer, ProfilePicture, NovoLink } from './styled';
import Loading from '../../components/Loading/Loading';

export default function Aluno() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    // executa o que está dentro da função do hook
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/alunos');
      setAlunos(response.data);
      setIsLoading(false);
    }

    getData();
  }, []);

  const handleDeleteAsk = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      const exclamation = e.currentTarget.nextSibling; // para pegar o componente htnml que está do lado do targer
      exclamation.setAttribute('display', 'block');
      e.currentTarget.remove();
    } else {
      toast.error('Você precisa fazer login para esta ação');
    }
  };

  const handleDelete = async (e, id, index) => {
    e.persist();
    try {
      setIsLoading(true);
      await axios.delete(`/alunos/${id}`);
      const novosAlunos = [...alunos];
      novosAlunos.splice(index, 1);

      setAlunos(novosAlunos);
      setIsLoading(false);
      toast.success('Aluno exluido com sucesso!');
    } catch (err) {
      // se o user não tiver um token, o back não deixa excluir
      // mas se o user deslogar, ele ainda via poder realizar a exclusão porque a chave Authorizatio com o token gerado
      // ainda vai estar no cabeçalho da requisição, mesmo que o state esteja limpo
      const status = get(err, 'response.status', 0);

      if (status === 401) {
        toast.error('Você precisa fazer login para esta ação');
      } else {
        toast.error('Erro ao excluir o aluno');
      }
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Alunos</h1>

      <NovoLink to="/aluno/">+ Adicionar aluno</NovoLink>
      <AlunoContainer>
        {alunos.map((aluno, index) => (
          <div key={String(aluno.id)}>
            <ProfilePicture>
              {get(aluno, 'Fotos[0].url', false) ? (
                <img src={aluno.Fotos[0].url} alt="Foto não encontrada" />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>
            <span>{aluno.nome}</span>
            <span>{aluno.email}</span>

            <Link to={`/aluno/${aluno.id}/edit`}>
              <FaEdit size={16} id="iconeActions" />
            </Link>
            <Link to={`/aluno/${aluno.id}/delete`} onClick={handleDeleteAsk}>
              <FaWindowClose size={16} id="iconeActions" />
            </Link>
            <FaExclamation
              size={16}
              display="none"
              cursor="pointer"
              onClick={(e) => handleDelete(e, aluno.id, index)}
            />
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
