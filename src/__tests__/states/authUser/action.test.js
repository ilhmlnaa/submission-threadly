/**
 * - authUser thunk spec
 *   - should dispatch action correctly when asyncLoginUser is called (success)
 *   - should handle error correctly when asyncLoginUser fails
 *   - should dispatch action correctly when asyncRegisterUser is called
 *   - should dispatch action correctly when asyncLogoutUser is called
 */

import { describe, it, beforeEach, afterEach, vi, expect } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import {
  asyncLoginUser,
  asyncRegisterUser,
  asyncLogoutUser,
} from '../../../states/authUser/action';

const fakeAuthUser = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

const fakeTokenResponse = 'fake-access-token';

const createFakeStore = (initialState = {}) => {
  return configureStore({
    reducer: (state = initialState) => state,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
};

describe('authUser thunk function', () => {
  let store;

  beforeEach(() => {
    store = createFakeStore();
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('asyncLoginUser', () => {
    it('should dispatch action correctly when asyncLoginUser is called (success)', async () => {
      global.fetch
        .mockResolvedValueOnce({
          json: async () => ({
            status: 'success',
            data: { token: fakeTokenResponse },
          }),
        })
        .mockResolvedValueOnce({
          json: async () => ({
            status: 'success',
            data: { user: fakeAuthUser },
          }),
        });

      await store.dispatch(
        asyncLoginUser({
          email: 'john@example.com',
          password: 'password123',
        })
      );

      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    it('should handle error correctly when asyncLoginUser fails', async () => {
      global.fetch.mockResolvedValue({
        json: async () => ({
          status: 'fail',
          message: 'Email or password is wrong',
        }),
      });

      try {
        await store.dispatch(
          asyncLoginUser({
            email: 'wrong@example.com',
            password: 'wrongpassword',
          })
        );
      } catch (err) {
        expect(err.message).toBe('Email or password is wrong');
      }

      expect(global.fetch).toHaveBeenCalled();
    });
  });

  describe('asyncRegisterUser', () => {
    it('should dispatch action correctly when asyncRegisterUser is called', async () => {
      global.fetch.mockResolvedValue({
        json: async () => ({
          status: 'success',
          data: { user: fakeAuthUser },
        }),
      });

      await store.dispatch(
        asyncRegisterUser({
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
        })
      );

      expect(global.fetch).toHaveBeenCalled();
    });
  });

  describe('asyncLogoutUser', () => {
    it('should dispatch action correctly when asyncLogoutUser is called', () => {
      const localStorageMock = {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
      };
      global.localStorage = localStorageMock;

      store.dispatch(asyncLogoutUser());

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('accessToken');
    });
  });
});
