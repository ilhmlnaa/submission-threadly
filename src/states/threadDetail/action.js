import toast from 'react-hot-toast';
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  UP_VOTE_THREAD_DETAIL: 'UP_VOTE_THREAD_DETAIL',
  DOWN_VOTE_THREAD_DETAIL: 'DOWN_VOTE_THREAD_DETAIL',
  NEUTRAL_VOTE_THREAD_DETAIL: 'NEUTRAL_VOTE_THREAD_DETAIL',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
  NEUTRAL_VOTE_COMMENT: 'NEUTRAL_VOTE_COMMENT',
  UP_VOTE_THREAD_DETAIL_FAILURE: 'UP_VOTE_THREAD_DETAIL_FAILURE',
  DOWN_VOTE_THREAD_DETAIL_FAILURE: 'DOWN_VOTE_THREAD_DETAIL_FAILURE',
  NEUTRAL_VOTE_THREAD_DETAIL_FAILURE: 'NEUTRAL_VOTE_THREAD_DETAIL_FAILURE',
  UP_VOTE_COMMENT_FAILURE: 'UP_VOTE_COMMENT_FAILURE',
  DOWN_VOTE_COMMENT_FAILURE: 'DOWN_VOTE_COMMENT_FAILURE',
  NEUTRAL_VOTE_COMMENT_FAILURE: 'NEUTRAL_VOTE_COMMENT_FAILURE',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function upVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.UP_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function downVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.DOWN_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function neutralVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.NEUTRAL_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function upVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.UP_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function downVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function neutralVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.NEUTRAL_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function upVoteThreadDetailFailureActionCreator(userId) {
  return {
    type: ActionType.UP_VOTE_THREAD_DETAIL_FAILURE,
    payload: {
      userId,
    },
  };
}

function downVoteThreadDetailFailureActionCreator(userId) {
  return {
    type: ActionType.DOWN_VOTE_THREAD_DETAIL_FAILURE,
    payload: {
      userId,
    },
  };
}

function neutralVoteThreadDetailFailureActionCreator(userId) {
  return {
    type: ActionType.NEUTRAL_VOTE_THREAD_DETAIL_FAILURE,
    payload: {
      userId,
    },
  };
}

function upVoteCommentFailureActionCreator({ commentId, userId }) {
  return {
    type: ActionType.UP_VOTE_COMMENT_FAILURE,
    payload: {
      commentId,
      userId,
    },
  };
}

function downVoteCommentFailureActionCreator({ commentId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT_FAILURE,
    payload: {
      commentId,
      userId,
    },
  };
}

function neutralVoteCommentFailureActionCreator({ commentId, userId }) {
  return {
    type: ActionType.NEUTRAL_VOTE_COMMENT_FAILURE,
    payload: {
      commentId,
      userId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncCreateComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncUpVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(upVoteThreadDetailActionCreator(authUser.id));

    try {
      await api.upVoteThread(threadDetail.id);
    } catch (error) {
      toast.error(error.message);
      dispatch(upVoteThreadDetailFailureActionCreator(authUser.id));
    }
  };
}

function asyncDownVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(downVoteThreadDetailActionCreator(authUser.id));

    try {
      await api.downVoteThread(threadDetail.id);
    } catch (error) {
      toast.error(error.message);
      dispatch(downVoteThreadDetailFailureActionCreator(authUser.id));
    }
  };
}

function asyncNeutralVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(neutralVoteThreadDetailActionCreator(authUser.id));

    try {
      await api.neutralVoteThread(threadDetail.id);
    } catch (error) {
      toast.error(error.message);
      dispatch(neutralVoteThreadDetailFailureActionCreator(authUser.id));
    }
  };
}

function asyncUpVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(upVoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      await api.upVoteComment({ threadId: threadDetail.id, commentId });
    } catch (error) {
      toast.error(error.message);
      dispatch(upVoteCommentFailureActionCreator({ commentId, userId: authUser.id }));
    }
  };
}

function asyncDownVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(downVoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      await api.downVoteComment({ threadId: threadDetail.id, commentId });
    } catch (error) {
      toast.error(error.message);
      dispatch(
        downVoteCommentFailureActionCreator({ commentId, userId: authUser.id })
      );
    }
  };
}

function asyncNeutralVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(
      neutralVoteCommentActionCreator({ commentId, userId: authUser.id })
    );

    try {
      await api.neutralVoteComment({ threadId: threadDetail.id, commentId });
    } catch (error) {
      toast.error(error.message);
      dispatch(
        neutralVoteCommentFailureActionCreator({ commentId, userId: authUser.id })
      );
    }
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  addCommentActionCreator,
  upVoteThreadDetailActionCreator,
  downVoteThreadDetailActionCreator,
  neutralVoteThreadDetailActionCreator,
  upVoteThreadDetailFailureActionCreator,
  downVoteThreadDetailFailureActionCreator,
  neutralVoteThreadDetailFailureActionCreator,
  upVoteCommentActionCreator,
  downVoteCommentActionCreator,
  neutralVoteCommentActionCreator,
  upVoteCommentFailureActionCreator,
  downVoteCommentFailureActionCreator,
  neutralVoteCommentFailureActionCreator,
  asyncReceiveThreadDetail,
  asyncCreateComment,
  asyncUpVoteThreadDetail,
  asyncDownVoteThreadDetail,
  asyncNeutralVoteThreadDetail,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralVoteComment,
};

