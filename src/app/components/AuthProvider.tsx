import { AuthProvider } from '@onr/auth/components/smart/Auth';
import { UserProvider } from '@onr/auth/components/smart/User';

export const AuthenticationProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <UserProvider>{children}</UserProvider>
    </AuthProvider>
  );
};
