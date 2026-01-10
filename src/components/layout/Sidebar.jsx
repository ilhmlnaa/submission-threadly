import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Tag } from 'lucide-react';
import { asyncReceiveLeaderboards } from '../../states/leaderboards/action';
import { TopContributorsSkeleton } from '../common/Skeleton';

function Sidebar({ categories, selectedCategory, onCategoryChange }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { leaderboards = [] } = useSelector((states) => states);

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  const topLeaderboards = leaderboards.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-6"
    >
      {/* Top Contributors */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {t('leaderboardsPage.topContributors')}
            </h3>
          </div>
          <Link
            to="/leaderboards"
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            {t('leaderboardsPage.leaderboards')}
          </Link>
        </div>

        {leaderboards.length === 0 ? (
          <TopContributorsSkeleton />
        ) : (
          <div className="space-y-3">
            {topLeaderboards.map((item, index) => (
              <div key={item.user.id} className="flex items-center space-x-3">
                <div className="text-sm font-bold text-gray-500 dark:text-gray-400 w-4">
                  {index + 1}
                </div>
                <img
                  src={item.user.avatar}
                  alt={item.user.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {item.user.name}
                  </p>
                </div>
                <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  {item.score}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Popular Categories */}
      {categories.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Tag className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {t('sidebar.trending')}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.slice(0, 10).map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => onCategoryChange(category)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                #{category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Stats Card */}
      <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-lg shadow-md p-6 text-white">
        <div className="flex items-center space-x-2 mb-3">
          <TrendingUp className="w-5 h-5" />
          <h3 className="text-lg font-semibold">{t('navigation.forumApp')}</h3>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-blue-100 text-sm">Active Today</span>
            <span className="font-bold text-xl">🔥</span>
          </div>
          <p className="text-xs text-blue-100 mt-3">
            {t('authAside.joinCommunity')}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

Sidebar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

export default Sidebar;
