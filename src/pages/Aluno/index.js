import { get } from 'lodash';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { isEmail, isInt, isFloat } from 'validator';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { FaEdit, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Container } from '../../styles/GlobalStyles';
import { Form, ProfilePicture } from './styled';
import Loading from '../../components/Loading/Loading';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

export default function Aluno({ match }) {
  const id = get(match, 'params.id', '');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [email, setEmail] = useState('');
  const [foto, setFoto] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  let formErrors = false;

  useEffect(() => {
    if (!id) return;
    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        const Foto = get(data, 'Fotos[0].url', '');
        setFoto(Foto);
        setNome(data.nome || 'Dado não encontrado');
        setIdade(data.idade || 0);
        setAltura(data.altura || 'Dado não encontrado');
        setPeso(data.peso || 'Dado não encontrado');
        setSobrenome(data.sobrenome || 'Dado não encontrado');
        setEmail(data.email || 'Dado não encontrado');
        // console.log(
        //   `Idade recebida: ${data.idade} | Idade colocada no input ${idade}`
        // );
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if (status === 400) errors.map((error) => toast.error(error));
        history.push('/');
      }
    }

    getData();
  }, [id, idade]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // isso vai bater na api, qualquer erro que capturarmos
    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error('Nome precisa ter entre 3 e 255 caracteres.');
    }
    if (sobrenome.length < 3 || sobrenome.length > 255) {
      formErrors = true;
      toast.error('sobrenome precisa ter entre 3 e 255 caracteres.');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido.');
    }

    if (!isInt(String(idade))) {
      formErrors = true;
      toast.error('Idade inválida.');
    }
    if (!isFloat(String(altura))) {
      formErrors = true;
      toast.error('altura inválida.');
    }
    if (!isFloat(String(peso))) {
      formErrors = true;
      toast.error('Peso inválido.');
    }

    if (formErrors) return;

    try {
      setIsLoading(true);
      if (id) {
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          altura,
          peso,
        });
        toast.success('Aluno editado com sucesso!');
      } else {
        await axios.post(`/alunos/`, {
          nome,
          sobrenome,
          email,
          idade,
          altura,
          peso,
        });
        toast.success('Aluno cadastrado com sucesso!');
        history.push('/');
      }
      setIsLoading(false);
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido.');
      }
      setIsLoading(false);
      if (status === 401) dispatch(actions.loginFailed());
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? 'Editar aluno' : 'Novo aluno'}</h1>

      {id && (
        <ProfilePicture>
          {foto ? <img src={foto} alt={nome} /> : <FaUserCircle size={180} />}
          <Link to={`/fotos/${id}`}>
            <FaEdit size={16} />
          </Link>
        </ProfilePicture>
      )}

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do aluno"
        />
        <input
          type="text"
          value={sobrenome}
          onChange={(e) => {
            setSobrenome(e.target.value);
          }}
          placeholder="Sobrenome do aluno"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email do aluno"
        />
        <input
          type="number"
          value={idade}
          onChange={(e) => {
            setIdade(e.target.value);
          }}
          placeholder="Idade do aluno"
        />
        <input
          type="text"
          value={altura}
          onChange={(e) => {
            setAltura(e.target.value);
          }}
          placeholder="Altura do aluno"
        />
        <input
          type="text"
          value={peso}
          onChange={(e) => {
            setPeso(e.target.value);
          }}
          placeholder="Peso do aluno"
        />

        <button type="submit">Cadastrar</button>
      </Form>
    </Container>
  );
}

Aluno.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
