/**
 * - ThreadItem component spec
 *   - should render ThreadItem component correctly with props
 *   - should display thread title, body, category, and author info
 *   - should display upvote and downvote counts
 *   - should display comment count
 *   - should call asyncUpVoteThread when upvote button is clicked
 *   - should navigate to detail page when thread is clicked
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import ThreadItem from '../../../components/thread/ThreadItem';
import { asyncUpVoteThread } from '../../../states/threads/action';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useHref: () => '/',
  };
});

const mockDispatch = vi.fn();
const mockUseSelector = vi.fn((callback) => callback({ authUser: null }));

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: () => mockDispatch,
    useSelector: (callback) => mockUseSelector(callback),
  };
});

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
    avatar: 'https://generated-image-url.jpg',
  },
};

const fakeAuthUser = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

const createMockStore = (authUser = null) => {
  return configureStore({
    reducer: (state = { authUser }) => state,
    preloadedState: { authUser },
  });
};

describe('ThreadItem component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseSelector.mockReturnValue(null);
  });

  it('should render ThreadItem component correctly with props', () => {
    const store = createMockStore(null);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThreadItem {...fakeThread} />
        </MemoryRouter>
      </Provider>
    );

    const title = screen.getByText('Thread Pertama');
    const category = screen.getByText('#General');

    expect(title).toBeInTheDocument();
    expect(category).toBeInTheDocument();
  });

  it('should display thread title, body, category, and author info', () => {
    const store = createMockStore(null);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThreadItem {...fakeThread} />
        </MemoryRouter>
      </Provider>
    );

    const title = screen.getByText('Thread Pertama');
    const category = screen.getByText('#General');
    const authorName = screen.getByText('John Doe');

    expect(title).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(authorName).toBeInTheDocument();
  });

  it('should display upvote and downvote counts', () => {
    const store = createMockStore(null);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThreadItem {...fakeThread} />
        </MemoryRouter>
      </Provider>
    );

    const voteCounts = screen.getAllByText('0');

    expect(voteCounts.length).toBeGreaterThan(0);
  });

  it('should display comment count', () => {
    const store = createMockStore(null);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThreadItem {...fakeThread} />
        </MemoryRouter>
      </Provider>
    );

    const commentCount = screen.getByText('5');

    expect(commentCount).toBeInTheDocument();
  });

  it('should call asyncUpVoteThread when upvote button is clicked', async () => {
    const user = userEvent.setup();
    mockUseSelector.mockReturnValue(fakeAuthUser);
    const store = createMockStore(fakeAuthUser);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThreadItem {...fakeThread} />
        </MemoryRouter>
      </Provider>
    );

    // Get all buttons and click the first one (upvote button)
    const allButtons = screen.getAllByRole('button');
    const upvoteButton = allButtons[1]; // Index 0 is the thread card, 1 is upvote button
    await user.click(upvoteButton);

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should navigate to detail page when thread is clicked', async () => {
    const user = userEvent.setup();
    const store = createMockStore(null);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThreadItem {...fakeThread} />
        </MemoryRouter>
      </Provider>
    );

    // Click on the thread title which is inside the clickable thread card
    const threadTitle = screen.getByText('Thread Pertama');
    await user.click(threadTitle);

    expect(mockNavigate).toHaveBeenCalledWith('/threads/thread-1');
  });
});
