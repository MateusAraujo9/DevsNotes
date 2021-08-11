import 'react-native-gesture-handler';
import React from 'react';

//Config navigation
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/stacks/MainStack';

//configuração do redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './src/store';
import { StatusBar } from 'react-native';

export default () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle="light-content"/>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}