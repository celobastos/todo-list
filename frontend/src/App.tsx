import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CadastroMembro from './pages/CadastroMembro/CadastroMembro';
import CadastroTarefa from './pages/CadastroTarefa';
import ListagemTarefas from './pages/ListagemTarefas';
import Login from './pages/Login/Login';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro-membro" element={<CadastroMembro />} />
        <Route
          path="/cadastro-tarefa"
          element={
            <PrivateRoute>
              <CadastroTarefa prioridadeInicial={''} onClose={function (): void {
                throw new Error('Function not implemented.');
              } } onAddTarefa={function (tarefa: any): void {
                throw new Error('Function not implemented.');
              } } />
            </PrivateRoute>
          }
        />
        <Route
          path="/listagem-tarefas"
          element={
            <PrivateRoute>
              <ListagemTarefas />
            </PrivateRoute>
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
