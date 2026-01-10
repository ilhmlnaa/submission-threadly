import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import CommentItem from './CommentItem';

function CommentsList({ comments }) {
  const { t } = useTranslation();

  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        {t('commentsList.noComments')}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </div>
  );
}

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
};

export default CommentsList;
