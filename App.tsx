import React from 'react';
import {View, StatusBar} from 'react-native';
import AppProvider from './src/hooks';

import {NavigationContainer} from '@react-navigation/native';

import Routes from './src/routes';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="dark-content" backgroundColor="#fff" />
    <AppProvider>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Routes />
      </View>
    </AppProvider>
  </NavigationContainer>
);

export default App;
