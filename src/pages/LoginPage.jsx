import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { LoginInput, PageTransition, AuthAside } from '../components';
import { asyncLoginUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const onLogin = ({ email, password }) => {
    setIsLoggingIn(true);
    dispatch(asyncLoginUser({ email, password }))
      .then(() => {
        navigate('/');
      })
      .finally(() => {
        setIsLoggingIn(false);
      });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side: Image & Text */}
      <AuthAside
        title={t('navigation.forumApp')}
        subtitle={`${t('authAside.welcomeMessage')  }. ${  t('authAside.joinCommunity')}`}
      />

      {/* Right Side: Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <PageTransition className="max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {t('loginPage.loginToForum')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t('loginPage.loginToForum')}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <LoginInput login={onLogin} loading={isLoggingIn} />

            <div className="mt-6 text-center border-t dark:border-gray-700 pt-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('loginPage.dontHaveAccount')}{' '}
                <Link
                  to="/register"
                  className="font-semibold text-blue-600 dark:text-blue-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  {t('loginPage.register')}
                </Link>
              </p>
            </div>
          </div>
        </PageTransition>
      </div>
    </div>
  );
}

export default LoginPage;
