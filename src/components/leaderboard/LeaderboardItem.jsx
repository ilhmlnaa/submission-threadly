import React from 'react';
import PropTypes from 'prop-types';
import { Trophy, Medal, Award } from 'lucide-react';

function LeaderboardItem({ user, score, rank }) {
  const getRankIcon = () => {
    switch (rank) {
    case 1:
      return <Trophy className="w-6 h-6 text-yellow-500" />;
    case 2:
      return <Medal className="w-6 h-6 text-gray-400" />;
    case 3:
      return <Award className="w-6 h-6 text-amber-600" />;
    default:
      return (
        <div className="w-6 h-6 flex items-center justify-center text-gray-500 dark:text-gray-400 font-semibold">
          {rank}
        </div>
      );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow">
      <div className="shrink-0">{getRankIcon()}</div>

      <img
        src={user.avatar}
        alt={user.name}
        className="w-12 h-12 rounded-full shrink-0"
      />

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
          {user.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
          {user.email}
        </p>
      </div>

      <div className="text-right shrink-0">
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          {score}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">points</div>
      </div>
    </div>
  );
}

LeaderboardItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
  rank: PropTypes.number.isRequired,
};

export default LeaderboardItem;
