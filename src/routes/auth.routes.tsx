import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Feed from '../pages/Feed';
import PostDetail from '../pages/PostDetail';
import UserProfile from '../pages/UserProfile';

// import { Container } from './styles';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {backgroundColor: '#fff'},
    }}>
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />
    <Auth.Screen name="Feed" component={Feed} />
    <Auth.Screen name="Post" component={PostDetail} />
    <Auth.Screen name="UserProfile" component={UserProfile} />
  </Auth.Navigator>
);

export default AuthRoutes;
