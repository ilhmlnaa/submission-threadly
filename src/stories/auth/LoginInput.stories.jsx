import { fn } from '@storybook/test';
import LoginInput from '../../components/auth/LoginInput';

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
