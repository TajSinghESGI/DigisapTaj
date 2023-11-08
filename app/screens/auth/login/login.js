import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Screen from '@app/components/ui/screen';
import CustomInput from '@app/components/ui/input';
import styled from 'styled-components/native';
import loginData from './login.json';
import { useDispatch, useSelector } from 'react-redux';
import AuthActions from '@app/redux/auth/actions.js';
import CustomButton from '@app/components/ui/button';

const SContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #ac6782;
`;

const SHeader = styled.Text`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: black;
`;

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hasErrors, setHasErrors] = useState('');

  const handleLogin = useCallback(() => {
    dispatch(AuthActions.loginRequest(username, password));
    // Vérifier la combinaison de nom d'utilisateur et de mot de passe
    const validUser = loginData.users.find((user) => user.username === username.toLowerCase() && user.password === password);
    if (validUser) {
      // Authentification réussie, appel réseau mettant à jour les informations et redirection vers la stack MAIN.
      dispatch(AuthActions.loginSuccess(validUser.username));
    } else {
      setHasErrors("La combinaison est incorrecte.")
    }
  }, [username, password]);

  return (
    <Screen>
      <SContainer>
        <SHeader>Connexion</SHeader>
        <CustomInput
          placeholder="Nom d'utilisateur / mail"
          value={username}
          onChangeText={text => setUsername(text)}
          error={hasErrors}
        />
        <CustomInput
          placeholder="Mot de passe"
          secureText
          value={password}
          onChangeText={setPassword}
          error={hasErrors}
        />
        <CustomButton
          marginTop={20}
          text="Connexion"
          backgroundColor="#5f9ea0"
          textColor="#fff"
          width={'80%'}
          textSize={20}
          onPress={handleLogin}
        />
      </SContainer>
    </Screen>
  );
};

export default LoginScreen;