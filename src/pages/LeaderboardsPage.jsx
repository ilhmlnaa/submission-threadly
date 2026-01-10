import React from 'react';
import { useTranslation } from 'react-i18next';
import { Trophy } from 'lucide-react';
import {
  LeaderboardItem,
  PageTransition,
  LeaderboardSkeleton,
} from '../components';
import useLeaderboards from '../hooks/useLeaderboards';

function LeaderboardsPage() {
  const { leaderboards, isLoading } = useLeaderboards();
  const { t } = useTranslation();

  return (
    <PageTransition>
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center space-x-3 mb-6">
            <Trophy className="w-8 h-8 text-blue-600 dark:text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {t('leaderboardsPage.leaderboards')}
            </h1>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t('leaderboardsPage.topContributors')}
          </p>

          {isLoading ? (
            <LeaderboardSkeleton />
          ) : (
            <div className="space-y-4">
              {leaderboards.map((leaderboard, index) => (
                <LeaderboardItem
                  key={leaderboard.user.id}
                  user={leaderboard.user}
                  score={leaderboard.score}
                  rank={index + 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

export default LeaderboardsPage;
