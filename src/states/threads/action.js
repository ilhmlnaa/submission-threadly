import toast from 'react-hot-toast';
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../utils/api';
import { receiveUsersActionCreator } from '../users/action';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  UP_VOTE_THREAD: 'UP_VOTE_THREAD',
  DOWN_VOTE_THREAD: 'DOWN_VOTE_THREAD',
  NEUTRAL_VOTE_THREAD: 'NEUTRAL_VOTE_THREAD',
  UP_VOTE_THREAD_FAILURE: 'UP_VOTE_THREAD_FAILURE',
  DOWN_VOTE_THREAD_FAILURE: 'DOWN_VOTE_THREAD_FAILURE',
  NEUTRAL_VOTE_THREAD_FAILURE: 'NEUTRAL_VOTE_THREAD_FAILURE',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function upVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function downVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function neutralVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRAL_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function upVoteThreadFailureActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UP_VOTE_THREAD_FAILURE,
    payload: {
      threadId,
      userId,
    },
  };
}

function downVoteThreadFailureActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_THREAD_FAILURE,
    payload: {
      threadId,
      userId,
    },
  };
}

function neutralVoteThreadFailureActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRAL_VOTE_THREAD_FAILURE,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncCreateThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      toast.error(error.message);
      dispatch(upVoteThreadFailureActionCreator({ threadId, userId: authUser.id }));
    }
  };
}

function asyncDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      toast.error(error.message);
      dispatch(downVoteThreadFailureActionCreator({ threadId, userId: authUser.id }));
    }
  };
}

function asyncNeutralVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(neutralVoteThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.neutralVoteThread(threadId);
    } catch (error) {
      toast.error(error.message);
      dispatch(
        neutralVoteThreadFailureActionCreator({ threadId, userId: authUser.id })
      );
    }
  };
}

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  neutralVoteThreadActionCreator,
  upVoteThreadFailureActionCreator,
  downVoteThreadFailureActionCreator,
  neutralVoteThreadFailureActionCreator,
  asyncPopulateUsersAndThreads,
  asyncCreateThread,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
};

