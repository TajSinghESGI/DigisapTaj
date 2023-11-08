import { SCREEN_NAMES } from '@app/navigation/navigation.types';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Login from '@app/screens/auth/login';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
      }}>

      <Stack.Screen
        name={SCREEN_NAMES.AUTH.LOGIN}
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
