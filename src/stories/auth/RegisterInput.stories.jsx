import { fn } from '@storybook/test';
import RegisterInput from '../../components/auth/RegisterInput';

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
    defaultName: 'John Doe',
    defaultEmail: 'john@example.com',
    defaultPassword: 'password123',
  },
};
