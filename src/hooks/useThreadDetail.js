import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  asyncReceiveThreadDetail,
  asyncCreateComment,
  asyncUpVoteThreadDetail,
  asyncDownVoteThreadDetail,
  asyncNeutralVoteThreadDetail,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralVoteComment,
} from '../states/threadDetail/action';

function useThreadDetail(threadId) {
  const { threadDetail = null, authUser = null, loadingBar } = useSelector(
    (states) => states
  );
  const dispatch = useDispatch();

  const fetchThreadDetail = useCallback(() => {
    if (threadId) {
      dispatch(asyncReceiveThreadDetail(threadId));
    }
  }, [dispatch, threadId]);

  const createComment = useCallback(
    (content) => {
      if (threadId) {
        return dispatch(asyncCreateComment({ threadId, content }));
      }
    },
    [dispatch, threadId]
  );

  const upVoteThread = useCallback(() => {
    dispatch(asyncUpVoteThreadDetail());
  }, [dispatch]);

  const downVoteThread = useCallback(() => {
    dispatch(asyncDownVoteThreadDetail());
  }, [dispatch]);

  const neutralVoteThread = useCallback(() => {
    dispatch(asyncNeutralVoteThreadDetail());
  }, [dispatch]);

  const upVoteComment = useCallback(
    (commentId) => {
      dispatch(asyncUpVoteComment(commentId));
    },
    [dispatch]
  );

  const downVoteComment = useCallback(
    (commentId) => {
      dispatch(asyncDownVoteComment(commentId));
    },
    [dispatch]
  );

  const neutralVoteComment = useCallback(
    (commentId) => {
      dispatch(asyncNeutralVoteComment(commentId));
    },
    [dispatch]
  );

  const isLoading = loadingBar?.default > 0 || !threadDetail;

  return {
    threadDetail,
    authUser,
    isLoading,
    fetchThreadDetail,
    createComment,
    upVoteThread,
    downVoteThread,
    neutralVoteThread,
    upVoteComment,
    downVoteComment,
    neutralVoteComment,
  };
}

export default useThreadDetail;
