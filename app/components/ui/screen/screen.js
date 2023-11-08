import * as React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import { useHeaderHeight } from '@react-navigation/elements';

import styled from 'styled-components/native';

const isIos = Platform.OS === 'ios';

const SFixedInnerContainer = styled.View`
  justify-content: flex-start;
  align-items: stretch;
  height: 100%;
  width: 100%;
`;

const SScrollContainer = styled.View`
  flex: 1;
  flex-grow: 1;
  height: 100%;
`;

const styles = StyleSheet.create({
  scrollInnerContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  keyboardAvoidingViewStyle: {
    flex: 1,
  },
});

// Composant pour les écrans non scrollable
function ScreenWithoutScrolling({
  behavior = isIos ? 'padding' : 'height',
  enableKeyboardAvoidingView = true,
  statusBarVisible = true,
  ...props
}) {
  const style = props.style || {};
  const backgroundStyle = props.backgroundColor
    ? { backgroundColor: props.backgroundColor }
    : { backgroundColor: 'white' };
  const Wrapper = props.unsafe ? View : SafeAreaView;
  const headerHeight = useHeaderHeight();

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingViewStyle}
      enabled={enableKeyboardAvoidingView}
      behavior={behavior}
      keyboardVerticalOffset={
        props.keyboardOffset === undefined ? headerHeight : props.keyboardOffset
      }>
      <StatusBar
        animated
        backgroundColor="transparent"
        translucent
        hidden={Platform.OS === 'android' ? false : !statusBarVisible}
        barStyle={props.statusBar ? props.statusBar : 'dark-content'}
      />
      <SFixedInnerContainer
        as={Wrapper}
        style={[backgroundStyle, style]}
        forceInset={props.forceInset}>
        {props.children}
      </SFixedInnerContainer>
    </KeyboardAvoidingView>
  );
}

// Composant pour les écrans scrollable
function ScreenWithScrolling({
  behavior = isIos ? 'padding' : 'height',
  keyboardShouldPersistTaps = 'never',
  enableKeyboardAvoidingView = true,
  statusBarVisible = true,
  ...props
}) {
  const style = props.style || {};
  const backgroundStyle =
    props.backgroundColor && !props.backgroundImage
      ? { backgroundColor: props.backgroundColor }
      : { backgroundColor: 'white' };
  const Wrapper = props.unsafe ? View : SafeAreaView;
  const headerHeight = useHeaderHeight();

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingViewStyle}
      behavior={behavior}
      enabled={enableKeyboardAvoidingView}
      keyboardVerticalOffset={
        props.keyboardOffset === undefined ? headerHeight : props.keyboardOffset
      }>
      <StatusBar
        animated
        backgroundColor="transparent"
        translucent
        hidden={Platform.OS === 'android' ? false : !statusBarVisible}
        barStyle={props.statusBar ? props.statusBar : 'dark-content'}
      />
      <SScrollContainer
        as={Wrapper}
        forceInset={props.forceInset}
        style={[backgroundStyle, style]}>
        <ScrollView
          contentContainerStyle={[styles.scrollInnerContainer, style]}
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}>
          {props.children}
        </ScrollView>
      </SScrollContainer>
    </KeyboardAvoidingView>
  );
}

// Render le screen en fonction du param "preset"
const Screen = ({ preset = 'fixed', ...rest }) => {
  if (preset === 'fixed') {
    return <ScreenWithoutScrolling preset={preset} {...rest} />;
  } else {
    return <ScreenWithScrolling preset={preset} {...rest} />;
  }
};

export default Screen;
