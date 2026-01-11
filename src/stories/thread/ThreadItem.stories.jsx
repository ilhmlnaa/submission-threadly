import React from 'react';
import { fn } from '@storybook/test';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import ThreadItem from '../../components/thread/ThreadItem';

const mockStore = configureStore({
  reducer: (
    state = {
      authUser: {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://i.pravatar.cc/300',
      },
    }
  ) => state,
});

export default {
  title: 'Thread/ThreadItem',
  component: ThreadItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    ),
  ],
};

const fakeThread = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 5,
  user: {
    id: 'user-1',
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/300',
  },
};

export const Default = {
  args: {
    ...fakeThread,
    upVote: fn(),
    downVote: fn(),
    neutralVote: fn(),
  },
};

export const WithUpVotes = {
  args: {
    ...fakeThread,
    upVotesBy: ['user-1', 'user-2', 'user-3'],
  },
};

export const WithDownVotes = {
  args: {
    ...fakeThread,
    downVotesBy: ['user-1', 'user-2'],
  },
};

export const WithLotsOfComments = {
  args: {
    ...fakeThread,
    totalComments: 42,
  },
};

export const LongTitle = {
  args: {
    ...fakeThread,
    title:
      'Thread with very long title that should wrap properly when displayed in the UI and test the text truncation',
  },
};

export const LongBody = {
  args: {
    ...fakeThread,
    body: 'Ini adalah thread pertama dengan body yang sangat panjang untuk menguji bagaimana text truncation bekerja di UI. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
};
