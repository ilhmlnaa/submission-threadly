import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';

function useLeaderboards() {
  const { leaderboards = [], loadingBar } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  const isLoading =
    loadingBar?.default > 0 ||
    (leaderboards.length === 0 && loadingBar?.default === undefined);

  return {
    leaderboards,
    isLoading,
  };
}

export default useLeaderboards;
