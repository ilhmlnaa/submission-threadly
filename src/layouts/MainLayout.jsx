import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';

function MainLayout() {
  const authUser = useSelector((states) => states.authUser);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navigation authUser={authUser} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
