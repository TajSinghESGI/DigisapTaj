import {
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import { SCREEN_NAMES } from '@app/navigation/navigation.types';
import HomeDevis from '@app/screens/devis/home-devis/home-devis';
import FormDevis from '@app/screens/devis/form-devis/form-devis';
import HomeFacture from '@app/screens/facture/home-facture/home-facture';
import FormFacture from '@app/screens/facture/form-facture/form-facture';
import TabBar from './tab-bar';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        options={{headerShown: false, cardStyle: {backgroundColor: 'white'}}}
        name={'BottomBar'}
        component={TabBar}
      />
      <Stack.Screen
        name={SCREEN_NAMES.DEVIS.HOME_DEVIS}
        component={HomeDevis}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.DEVIS.FORM_DEVIS}
        component={FormDevis}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.FACTURE.HOME_FACTURE}
        component={HomeFacture}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.FACTURE.FORM_FACTURE}
        component={FormFacture}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default React.memo(MainStack);
