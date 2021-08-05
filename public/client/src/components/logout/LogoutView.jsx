import React from 'react';

import './logoutView.css';

export default function LogoutView({ handleLogout }) {
  return (
    <div onClick={handleLogout} className="logout-btn">
      Logout
    </div>
  );
}
