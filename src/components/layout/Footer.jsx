import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, Github, Linkedin } from 'lucide-react';

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-500">
              {t('navigation.forumApp')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
              {t('authAside.welcomeMessage')}. {t('authAside.joinCommunity')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 text-sm transition-all flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-600 mr-0 group-hover:mr-2 transition-all"></span>
                  {t('navigation.home')}
                </a>
              </li>
              <li>
                <a
                  href="/leaderboards"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 text-sm transition-all flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-600 mr-0 group-hover:mr-2 transition-all"></span>
                  {t('navigation.leaderboards')}
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Connect With Us
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all"
                aria-label="Github"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all"
                aria-label="Linkedin"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Platform Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Platform
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Built for Dicoding Academy - React Web Developer Expert Submission.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-gray-600 dark:text-gray-400 text-sm">
          <div className="flex items-center">
            Made with{' '}
            <Heart className="w-4 h-4 mx-1 text-red-500 animate-pulse" fill="currentColor" />{' '}
            by <span className="font-bold ml-1 text-gray-900 dark:text-white">Ilham</span>
          </div>
          <p>© {new Date().getFullYear()} {t('navigation.forumApp')}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
