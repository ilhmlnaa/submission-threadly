import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  asyncPopulateUsersAndThreads,
  asyncCreateThread,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
} from '../states/threads/action';

function useThreads() {
  const { threads = [], users = [], authUser = null, loadingBar } = useSelector(
    (states) => states
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const isLoading =
    loadingBar?.default > 0 ||
    (threads.length === 0 && loadingBar?.default === undefined);

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
  }));

  const categories = [
    ...new Set(threads.map((thread) => thread.category).filter(Boolean)),
  ];

  const createThread = ({ title, body, category }) => {
    return dispatch(asyncCreateThread({ title, body, category }));
  };

  const upVoteThread = (threadId) => {
    dispatch(asyncUpVoteThread(threadId));
  };

  const downVoteThread = (threadId) => {
    dispatch(asyncDownVoteThread(threadId));
  };

  const neutralVoteThread = (threadId) => {
    dispatch(asyncNeutralVoteThread(threadId));
  };

  return {
    threads: threadList,
    categories,
    isLoading,
    authUser,
    createThread,
    upVoteThread,
    downVoteThread,
    neutralVoteThread,
  };
}

export default useThreads;
