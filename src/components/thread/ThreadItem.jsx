import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { postedAt, sanitizeHtml } from '../../utils';
import {
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
} from '../../states/threads/action';

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  user,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = useSelector((states) => states.authUser);

  const isUpVoted = authUser && upVotesBy.includes(authUser.id);
  const isDownVoted = authUser && downVotesBy.includes(authUser.id);

  const onUpVote = (e) => {
    e.stopPropagation();
    if (!authUser) {
      toast.error('Please login to vote');
      return;
    }
    if (isUpVoted) {
      dispatch(asyncNeutralVoteThread(id));
    } else {
      dispatch(asyncUpVoteThread(id));
    }
  };

  const onDownVote = (e) => {
    e.stopPropagation();
    if (!authUser) {
      toast.error('Please login to vote');
      return;
    }
    if (isDownVoted) {
      dispatch(asyncNeutralVoteThread(id));
    } else {
      dispatch(asyncDownVoteThread(id));
    }
  };

  const onThreadClick = () => {
    navigate(`/threads/${id}`);
  };

  const onThreadPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      navigate(`/threads/${id}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onClick={onThreadClick}
      onKeyDown={onThreadPress}
      role="button"
      tabIndex={0}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer p-6 mb-4 border border-transparent hover:border-blue-100 dark:hover:border-blue-900"
    >
      <div className="flex items-start space-x-4">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-10 h-10 rounded-full shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {user.name}
            </span>
            <span className="text-gray-500 dark:text-gray-400">•</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {postedAt(createdAt)}
            </span>
          </div>

          {category && (
            <span className="inline-block px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-md mb-2">
              #{category}
            </span>
          )}

          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {title}
          </h3>

          <div
            className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(body) }}
          />

          <div className="flex items-center space-x-6">
            <button
              type="button"
              onClick={onUpVote}
              className={`flex items-center space-x-2 transition-colors ${
                isUpVoted
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <ThumbsUp
                className="w-5 h-5"
                fill={isUpVoted ? 'currentColor' : 'none'}
              />
              <span className="text-sm font-medium">{upVotesBy.length}</span>
            </button>

            <button
              type="button"
              onClick={onDownVote}
              className={`flex items-center space-x-2 transition-colors ${
                isDownVoted
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400'
              }`}
            >
              <ThumbsDown
                className="w-5 h-5"
                fill={isDownVoted ? 'currentColor' : 'none'}
              />
              <span className="text-sm font-medium">{downVotesBy.length}</span>
            </button>

            <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">{totalComments}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
};

export default ThreadItem;
