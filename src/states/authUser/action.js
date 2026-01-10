import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import toast from 'react-hot-toast';
import api from '../../utils/api';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
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
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncRegisterUser,
  asyncLoginUser,
  asyncLogoutUser,
};
