import React from 'react';
import { UserService, UserRequestPayload } from '@onr/user';
import { UserForm } from './UserForm';

interface CreateUserFormProps {
  onSubmit: () => void;
}

export const CreateUserForm: React.FC<CreateUserFormProps> = ({
  onSubmit,
}: CreateUserFormProps) => {
  return <UserForm handleSubmit={handleSubmit} currentUser={{}} />;

  async function handleSubmit(user: UserRequestPayload) {
    await UserService.createUser(user);

    if (onSubmit) {
      onSubmit();
    }
  }
};
