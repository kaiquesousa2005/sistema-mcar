import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import './Header.css';

const Header = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <header className="header">
      <h1>Sistema de Gerenciamento de Veículos</h1>
      <nav>
        <ul>
          {currentUser ? (
            <>
              <li><Link to="/home">Início</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <li><Link to="/">Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

