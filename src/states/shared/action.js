import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import toast from 'react-hot-toast';
import api from '../../utils/api';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';
import {
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
} from '../authUser/action';
import { setIsPreloadActionCreator } from '../isPreload/action';

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

function asyncPreloadProcess() {
  return async (dispatch) => {
    try {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch {
      dispatch(setAuthUserActionCreator(null));
    } finally {
      dispatch(setIsPreloadActionCreator(false));
    }
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.register({ name, email, password });
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncLoginUser({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const token = await api.login({ email, password });
      api.putAccessToken(token);

      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
      toast.success(`Selamat datang, ${authUser.name}!`);
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncLogoutUser() {
  return (dispatch) => {
    dispatch(unsetAuthUserActionCreator());
    api.removeAccessToken();
  };
}

export {
  asyncPopulateUsersAndThreads,
  asyncPreloadProcess,
  asyncRegisterUser,
  asyncLoginUser,
  asyncLogoutUser,
};
