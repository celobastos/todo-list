import React from 'react';
import ListagemTarefas from './ListagemTarefas';
import CadastroTarefa from './CadastroTarefa';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1>Bem-vindo ao ToDo List</h1>
      <div className="task-board">
        <div className="task-column baixa">
          <div className="column-header">Baixa</div>
        </div>
        <div className="task-column media">
          <div className="column-header">Média</div>
        </div>
        <div className="task-column alta">
          <div className="column-header">Alta</div>
        </div>
        <div className="task-column urgente">
          <div className="column-header">Urgente</div>
        </div>
        <div className="task-column sos">
          <div className="column-header">SOS</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
