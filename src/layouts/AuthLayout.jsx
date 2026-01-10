import React from 'react';
import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <main className="flex-1 flex items-center justify-center p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;
