import React from 'react';
import { fn } from 'storybook/test';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../utils/i18n';
import RegisterInput from '../../components/auth/RegisterInput';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Auth/RegisterInput',
  component: RegisterInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    ),
  ],
  args: {
    register: fn(),
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default = {
  args: {
    loading: false,
  },
};

export const Loading = {
  args: {
    loading: true,
  },
};
