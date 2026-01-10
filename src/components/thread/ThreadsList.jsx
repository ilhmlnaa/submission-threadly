import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';

function ThreadsList({ threads, authUser, upVote, downVote, neutralVote }) {
  return (
    <div className="space-y-4">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          {...thread}
          authUser={authUser}
          upVote={upVote}
          downVote={downVote}
          neutralVote={neutralVote}
        />
      ))}
    </div>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralVote: PropTypes.func.isRequired,
};

ThreadsList.defaultProps = {
  authUser: null,
};

export default ThreadsList;
