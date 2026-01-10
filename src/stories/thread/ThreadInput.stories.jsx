import React from 'react';
import { fn } from 'storybook/test';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../utils/i18n';
import ThreadInput from '../../components/thread/ThreadInput';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Thread/ThreadInput',
  component: ThreadInput,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18n}>
        <div className="max-w-4xl mx-auto p-4">
          <Story />
        </div>
      </I18nextProvider>
    ),
  ],
  args: {
    addThread: fn(),
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
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
