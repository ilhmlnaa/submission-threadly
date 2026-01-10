/**
 * - threads thunk spec
 *   - should dispatch action correctly when asyncCreateThread is called
 *   - should dispatch action correctly when asyncUpVoteThread is called (success)
 *   - should dispatch failure action when asyncUpVoteThread API fails
 *   - should dispatch action correctly when asyncPopulateUsersAndThreads is called
 */

import { describe, it, beforeEach, afterEach, vi, expect } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import {
  asyncCreateThread,
  asyncUpVoteThread,
  asyncPopulateUsersAndThreads,
} from '../../../states/threads/action';

const fakeThreadsResponse = [
  {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

const fakeUsersResponse = [
  {
    id: 'users-1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
];

const fakeAuthUser = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

const fakeThreadResponse = {
  id: 'thread-new',
  title: 'Thread Baru',
  body: 'Ini adalah thread baru',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  ownerId: 'user-1',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
};

const createFakeStore = (initialState = {}) => {
  return configureStore({
    reducer: (state = initialState) => state,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
};

describe('threads thunk function', () => {
  let store;

  beforeEach(() => {
    store = createFakeStore({
      authUser: fakeAuthUser,
    });
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('asyncCreateThread', () => {
    it('should dispatch action correctly when asyncCreateThread is called', async () => {
      global.fetch.mockResolvedValue({
        json: async () => ({
          status: 'success',
          data: { thread: fakeThreadResponse },
        }),
      });

      await store.dispatch(
        asyncCreateThread({
          title: 'Thread Baru',
          body: 'Ini adalah thread baru',
          category: 'General',
        })
      );

      expect(global.fetch).toHaveBeenCalled();
    });
  });

  describe('asyncUpVoteThread', () => {
    it('should dispatch action correctly when asyncUpVoteThread is called (success)', async () => {
      global.fetch.mockResolvedValue({
        json: async () => ({
          status: 'success',
          data: { vote: {} },
        }),
      });

      await store.dispatch(asyncUpVoteThread('thread-1'));

      expect(global.fetch).toHaveBeenCalled();
    });

    it('should dispatch failure action when asyncUpVoteThread API fails', async () => {
      global.fetch.mockRejectedValue(new Error('Network error'));

      try {
        await store.dispatch(asyncUpVoteThread('thread-1'));
      } catch (err) {
        expect(err.message).toBe('Network error');
      }

      expect(global.fetch).toHaveBeenCalled();
    });
  });

  describe('asyncPopulateUsersAndThreads', () => {
    it('should dispatch action correctly when asyncPopulateUsersAndThreads is called', async () => {
      global.fetch
        .mockResolvedValueOnce({
          json: async () => ({
            status: 'success',
            data: { users: fakeUsersResponse },
          }),
        })
        .mockResolvedValueOnce({
          json: async () => ({
            status: 'success',
            data: { threads: fakeThreadsResponse },
          }),
        });

      await store.dispatch(asyncPopulateUsersAndThreads());

      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
  });
});
