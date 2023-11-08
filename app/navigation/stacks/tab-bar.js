import {SCREEN_NAMES} from '@app/navigation/navigation.types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '@app/screens/devis/home-devis/home-devis';
import Facture from '@app/screens/facture/home-facture/home-facture';

const Tab = createBottomTabNavigator();

const TabBar = () => {
  return (
    <Tab.Navigator
      headerMode="screen"
      screenOptions={{
        headerTransparent: true,
        headerShown: false,
        tabBarIconStyle: { display: "none" },
      }}>
      <Tab.Screen name={SCREEN_NAMES.DEVIS.HOME_DEVIS} component={Home} />

      <Tab.Screen name={SCREEN_NAMES.FACTURE.HOME_FACTURE} component={Facture} />

    </Tab.Navigator>
  );
};

export default TabBar;