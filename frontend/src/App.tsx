import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CadastroMembro from './pages/CadastroMembro/CadastroMembro';
import CadastroTarefa from './pages/CadastroTarefa';
import EdicaoTarefa from './pages/EdicaoTarefa';
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
              <CadastroTarefa />
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
          path="/edicao-tarefa/:id"
          element={
            <PrivateRoute>
              <EdicaoTarefa />
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
