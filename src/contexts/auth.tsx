import { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/user';

const newUser = {
  email: 'xxxxx',
  password: ''
} as User;

const initialContext = {
  user: newUser,
  setUser: (user: User) => { },
  signed: false,
  signin: (email: string, password: string) => { },
  signup: (email: string, password: string) => { },
  signout: () => { }
};

export const AuthContext = createContext(initialContext);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>(newUser);

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    const usersStorage = localStorage.getItem("users_bd");

    if (userToken && usersStorage) {
      const hasUser = JSON.parse(usersStorage)?.filter(
        (user: User) => user.email === JSON.parse(userToken).email
      );

      if (hasUser) setUser(hasUser[0]);
    }
  }, []);

  const signin = (email: string, password: string) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd") || '{}');

    const hasUser = usersStorage?.filter((user: User) => user.email === email);
    console.log(hasUser);


    if (hasUser?.length) {
      if (hasUser[0].email === email && hasUser[0].password === password) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("user_token", JSON.stringify({ email, token }));
        setUser({ email, password });
        return;
      } else {
        return "Wrong E-mail or Password";
      }
    } else {
      return "User not found";
    }
  };

  const signup = (email: string, password: string) => {
    console.log(localStorage);
    const usersStorage = JSON.parse(localStorage.getItem("users_bd") || '{}');

    const hasUser = usersStorage?.filter((user: User) => user.email === email);

    if (hasUser?.length) {
      return "There is already an user with this e-mail";
    }

    let newUser;

    if (usersStorage) {
      newUser = [...usersStorage, { email, password }];
    } else {
      newUser = [{ email, password }];
    }

    localStorage.setItem("users_bd", JSON.stringify(newUser));
    setUser({ email, password })
  };

  const signout = () => {
    setUser(newUser);
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, signed: !!user, signin, signout, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error(
    "Expected an AppProvider somewhere in the react tree to set context value")
  return context;
}
