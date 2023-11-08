import { SCREEN_NAMES } from '@app/navigation/navigation.types';
import MainStack from '@app/navigation/stacks/main-stack';
import AuthStack from '@app/navigation/stacks/auth-stack';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
} from '@react-navigation/stack';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

const Navigation = ({}) => {
  const { isLogged } = useSelector((state) => state.auth);  
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' },
          gestureEnabled: true,
          gestureDirection: 'vertical'}}>
        {isLogged ? (
          <Stack.Screen name={SCREEN_NAMES.MAIN} component={MainStack} />
        ) : (
          <Stack.Screen
            name={SCREEN_NAMES.AUTH.LOGIN}
            component={AuthStack}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default memo(Navigation);
