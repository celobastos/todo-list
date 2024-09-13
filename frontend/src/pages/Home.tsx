import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Bem-vindo ao ToDo List</h1>
      <nav>
        <ul>
          <li><Link to="/cadastro-membro">Cadastro de Membro</Link></li>
          <li><Link to="/cadastro-tarefa">Cadastro de Tarefa</Link></li>
          <li><Link to="/listagem-tarefas">Listagem de Tarefas</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
