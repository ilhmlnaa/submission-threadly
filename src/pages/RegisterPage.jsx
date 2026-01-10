import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { RegisterInput, PageTransition, AuthAside } from '../components';
import { asyncRegisterUser } from '../states/authUser/action';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isRegistering, setIsRegistering] = useState(false);

  const onRegister = ({ name, email, password }) => {
    setIsRegistering(true);
    dispatch(asyncRegisterUser({ name, email, password }))
      .then(() => {
        toast.success(t('registerPage.registerSuccess'));
        navigate('/login');
      })
      .finally(() => {
        setIsRegistering(false);
      });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side: Image & Text */}
      <AuthAside
        title={t('navigation.forumApp')}
        subtitle={`${t('authAside.welcomeMessage')  }. ${  t('authAside.joinCommunity')}`}
      />

      {/* Right Side: Register Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <PageTransition className="max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {t('registerPage.createAccount')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t('authAside.joinCommunity')}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <RegisterInput register={onRegister} loading={isRegistering} />

            <div className="mt-6 text-center border-t dark:border-gray-700 pt-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('registerPage.alreadyHaveAccount')}{' '}
                <Link
                  to="/login"
                  className="font-semibold text-blue-600 dark:text-blue-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  {t('registerPage.login')}
                </Link>
              </p>
            </div>
          </div>
        </PageTransition>
      </div>
    </div>
  );
}

export default RegisterPage;
