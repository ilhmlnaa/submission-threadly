import React from 'react';
import { fn } from '@storybook/test';
import LoginInput from '../../components/auth/LoginInput';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Auth/LoginInput',
  component: LoginInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    login: fn(),
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

export const WithValues = {
  args: {
    loading: false,
    defaultEmail: 'test@example.com',
    defaultPassword: 'password123',
  },
};
