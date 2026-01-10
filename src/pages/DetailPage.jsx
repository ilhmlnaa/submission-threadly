import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  CommentInput,
  CommentsList,
  PageTransition,
  ThreadDetailSkeleton,
} from '../components';
import { postedAt, sanitizeHtml } from '../utils';
import useThreadDetail from '../hooks/useThreadDetail';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    threadDetail,
    authUser,
    fetchThreadDetail,
    createComment,
    upVoteThread,
    downVoteThread,
    neutralVoteThread,
    upVoteComment,
    downVoteComment,
    neutralVoteComment,
  } = useThreadDetail(id);
  const [isAddingComment, setIsAddingComment] = useState(false);

  useEffect(() => {
    fetchThreadDetail();
  }, [id, fetchThreadDetail]);

  const isUpVoted = authUser && threadDetail?.upVotesBy.includes(authUser.id);
  const isDownVoted =
    authUser && threadDetail?.downVotesBy.includes(authUser.id);

  const onAddComment = (content) => {
    if (!authUser) {
      toast.error(
        t('common.pleaseLogin', {
          action: t('detailPage.comments').toLowerCase(),
        })
      );
      return;
    }

    setIsAddingComment(true);
    createComment(content)
      .then(() => {
        toast.success(t('detailPage.commentAdded'));
      })
      .finally(() => {
        setIsAddingComment(false);
      });
  };

  const onUpVoteThread = () => {
    if (!authUser) {
      toast.error(t('common.pleaseLoginToVote'));
      return;
    }
    if (isUpVoted) {
      neutralVoteThread();
    } else {
      upVoteThread();
    }
  };

  const onDownVoteThread = () => {
    if (!authUser) {
      toast.error(t('common.pleaseLoginToVote'));
      return;
    }
    if (isDownVoted) {
      neutralVoteThread();
    } else {
      downVoteThread();
    }
  };

  const onUpVoteComment = (commentId) => {
    upVoteComment(commentId);
  };

  const onDownVoteComment = (commentId) => {
    downVoteComment(commentId);
  };

  const onNeutralVoteComment = (commentId) => {
    neutralVoteComment(commentId);
  };

  return (
    <PageTransition>
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t('detailPage.backToHome')}</span>
          </button>

          {!threadDetail ? (
            <ThreadDetailSkeleton />
          ) : (
            <>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={threadDetail.owner.avatar}
                    alt={threadDetail.owner.name}
                    className="w-12 h-12 rounded-full shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {threadDetail.owner.name}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        •
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {postedAt(threadDetail.createdAt)}
                      </span>
                    </div>

                    {threadDetail.category && (
                      <span className="inline-block px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-md">
                        #{threadDetail.category}
                      </span>
                    )}
                  </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  {threadDetail.title}
                </h1>

                <div
                  className="prose prose-gray dark:prose-invert max-w-none mb-6"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(threadDetail.body) }}
                />

                <div className="flex items-center space-x-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={onUpVoteThread}
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
                    <span className="text-sm font-medium">
                      {threadDetail.upVotesBy.length}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={onDownVoteThread}
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
                    <span className="text-sm font-medium">
                      {threadDetail.downVotesBy.length}
                    </span>
                  </button>

                  <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      {threadDetail.comments.length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {t('detailPage.comments')} ({threadDetail.comments.length})
                </h2>

                {/* Comment Input */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    {t('detailPage.comments')}
                  </h3>
                  {authUser ? (
                    <CommentInput
                      addComment={onAddComment}
                      loading={isAddingComment}
                    />
                  ) : (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-6 text-center">
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {t('common.pleaseLogin', {
                          action: t('detailPage.comments').toLowerCase(),
                        })}
                      </p>
                      <Link
                        to="/login"
                        className="inline-flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                      >
                        {t('navigation.login')}
                      </Link>
                    </div>
                  )}
                </div>

                <CommentsList
                  comments={threadDetail.comments}
                  authUser={authUser}
                  upVote={onUpVoteComment}
                  downVote={onDownVoteComment}
                  neutralVote={onNeutralVoteComment}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

export default DetailPage;
