import React, {createContext, useState, useContext} from 'react';

interface SignInCredentials {
  email: string;
  password: string;
}

interface UserContextData {
  user: User;
  post: Post;
  setUser(user: User): void;
  setPost(post: Post): void;
}

interface User {
  name: string;
  email: string;
  avatar: string;
  password: string;
  product_id: number;
  id: number;
}

interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
  date: string;
}

const AuthContext = createContext<UserContextData>({} as UserContextData);

export const UserProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<User>({} as User);

  const [post, setPost] = useState<Post>({} as Post);

  return (
    <AuthContext.Provider value={{user, setUser, post, setPost}}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): UserContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a UserProvider');
  }

  return context;
}
