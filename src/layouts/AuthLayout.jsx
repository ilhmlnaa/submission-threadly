import React from 'react';
import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Outlet />
    </main>
  );
}

export default AuthLayout;
