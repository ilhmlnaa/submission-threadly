import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, AlertCircle } from 'lucide-react';
import { PageTransition } from '../components';

function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <PageTransition>
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
            <AlertCircle className="w-24 h-24 text-blue-500 relative animate-pulse" />
          </div>

          <h1 className="text-6xl font-bold text-slate-500 dark:text-slate-100 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-slate-300 mb-6">
            {t('notFoundPage.title')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
            {t('notFoundPage.message')}
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/25"
          >
            <Home className="w-5 h-5" />
            {t('notFoundPage.backToHome')}
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}

export default NotFoundPage;
