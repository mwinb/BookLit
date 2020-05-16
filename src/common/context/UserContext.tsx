import { UserInterface, DEFAULT_USER } from '../interfaces';
import React, { createContext, ReactElement, useState, FunctionComponent, useContext } from 'react';

export interface UserContextInterface {
  user: UserInterface;
  setUser(newUser: UserInterface): void;
}

export const DEFAULT_USER_CONTEXT: UserContextInterface = {
  user: DEFAULT_USER,
  setUser: (_newUser: UserInterface) => {
    DEFAULT_USER_CONTEXT.user = _newUser;
  },
};

const UserContext = createContext<UserContextInterface>(DEFAULT_USER_CONTEXT);

const UserProvider: FunctionComponent<{}> = (props): ReactElement => {
  const [user, setUser] = useState<UserInterface>(DEFAULT_USER);

  return <UserContext.Provider value={{ user, setUser }}>{props.children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
