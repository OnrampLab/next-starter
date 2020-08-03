import React from 'react';
import { IUser, UserService, UserRequestPayload } from '@onr/user';
import { UserForm } from './UserForm';

interface UpdateUserFormProps {
  currentUser: IUser;
  onSubmit: () => void;
}

export const UpdateUserForm: React.FC<UpdateUserFormProps> = ({
  currentUser,
  onSubmit,
}: UpdateUserFormProps) => {
  return <UserForm handleSubmit={handleSubmit} currentUser={currentUser} />;

  async function handleSubmit(user: UserRequestPayload) {
    if (!currentUser.id) {
      return;
    }

    await UserService.updateUser(Object.assign({ userId: currentUser.id }, user));

    if (onSubmit) {
      onSubmit();
    }
  }
};
