import React from 'react';
import PropTypes from 'prop-types';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import toast from 'react-hot-toast';
import { postedAt } from '../../utils';

function CommentItem({
  id,
  content,
  createdAt,
  upVotesBy,
  downVotesBy,
  owner,
  authUser,
  upVote,
  downVote,
  neutralVote,
}) {
  const isUpVoted = authUser && upVotesBy.includes(authUser.id);
  const isDownVoted = authUser && downVotesBy.includes(authUser.id);

  const onUpVote = () => {
    if (!authUser) {
      toast.error('Please login to vote');
      return;
    }
    if (isUpVoted) {
      neutralVote(id);
    } else {
      upVote(id);
    }
  };

  const onDownVote = () => {
    if (!authUser) {
      toast.error('Please login to vote');
      return;
    }
    if (isDownVoted) {
      neutralVote(id);
    } else {
      downVote(id);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-3">
      <div className="flex items-start space-x-3">
        <img
          src={owner.avatar}
          alt={owner.name}
          className="w-8 h-8 rounded-full shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-medium text-gray-900 dark:text-gray-100 text-sm">
              {owner.name}
            </span>
            <span className="text-gray-500 dark:text-gray-400">•</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {postedAt(createdAt)}
            </span>
          </div>

          <div
            className="text-gray-700 dark:text-gray-300 text-sm mb-3"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={onUpVote}
              className={`flex items-center space-x-1 transition-colors ${
                isUpVoted
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <ThumbsUp
                className="w-4 h-4"
                fill={isUpVoted ? 'currentColor' : 'none'}
              />
              <span className="text-xs font-medium">{upVotesBy.length}</span>
            </button>

            <button
              type="button"
              onClick={onDownVote}
              className={`flex items-center space-x-1 transition-colors ${
                isDownVoted
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400'
              }`}
            >
              <ThumbsDown
                className="w-4 h-4"
                fill={isDownVoted ? 'currentColor' : 'none'}
              />
              <span className="text-xs font-medium">{downVotesBy.length}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralVote: PropTypes.func.isRequired,
};

CommentItem.defaultProps = {
  authUser: null,
};

export default CommentItem;
