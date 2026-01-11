import React from 'react';
import { fn } from '@storybook/test';
import ThreadInput from '../../components/thread/ThreadInput';

export default {
  title: 'Thread/ThreadInput',
  component: ThreadInput,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-4xl mx-auto p-4">
        <Story />
      </div>
    ),
  ],
  args: {
    addThread: fn(),
  },
};

export const Default = {
  args: {
    loading: false,
    onCancel: null,
  },
};

export const WithCancelButton = {
  args: {
    loading: false,
    onCancel: fn(),
  },
};

export const Loading = {
  args: {
    loading: true,
    onCancel: fn(),
  },
};

export const LongContent = {
  args: {
    loading: false,
    onCancel: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'ThreadInput with long content in title, category, and body fields.',
      },
    },
  },
};
