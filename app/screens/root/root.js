import Navigation from '@app/navigation';
import React from 'react';
import { StatusBar, View } from 'react-native';

const Root = ({ }) => {
  return (
    <View flex={1}>
      <StatusBar barStyle="dark-content" />
      <Navigation />
    </View>
  );
};

export default Root;
