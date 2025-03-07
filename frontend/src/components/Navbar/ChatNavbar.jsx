// frontend/src/components/Navbar/ChatNavbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider.jsx';

function ChatNavbar() {
  const { isAuthenticated, logOut } = useAuth();

  const handleLogout = () => {
    logOut();
  };

  return (
    <nav style={{ background: '#eee', padding: '0.5rem' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>
        Chat
      </Link>
      {isAuthenticated && (
        <button type="button" onClick={handleLogout}>
          Log out
        </button>
      )}
    </nav>
  );
}

export default ChatNavbar;
