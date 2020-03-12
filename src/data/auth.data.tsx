import * as React from 'react';
import { noop } from '../lib/fn';
import { getCurrentUser, login, logout, register } from '../services/auth.service';
import { UserData } from '../type';

const AuthDataContext = React.createContext<UserData | null>(getCurrentUser());
AuthDataContext.displayName = 'AuthData';

type AuthActions = {
  login: (email: string) => Promise<void>;
  register: (data: Omit<UserData, '_id'>) => Promise<void>;
  logout: () => void;
};

const AuthActionsContext = React.createContext<AuthActions>({
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: noop,
});
AuthActionsContext.displayName = 'AuthActions';

export const AuthProvider: React.FC = props => {
  const [user, setUser] = React.useState(getCurrentUser);

  const actions: AuthActions = React.useMemo(
    () => ({
      login: email => login(email).then(setUser),
      register: data => register(data).then(setUser),
      logout: () => {
        setUser(null);
        logout();
      },
    }),
    []
  );

  return (
    <AuthDataContext.Provider value={user}>
      <AuthActionsContext.Provider value={actions}>{props.children}</AuthActionsContext.Provider>
    </AuthDataContext.Provider>
  );
};

export const useAuthUser = () => React.useContext(AuthDataContext);

export const useAuthActions = () => React.useContext(AuthActionsContext);
