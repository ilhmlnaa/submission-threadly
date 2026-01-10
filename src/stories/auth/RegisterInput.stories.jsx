import React from 'react';
import { fn } from 'storybook/test';
import RegisterInput from '../../components/auth/RegisterInput';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Auth/RegisterInput',
  component: RegisterInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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
