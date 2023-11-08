import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';

const InputContainer = styled.View`
  margin-bottom: 20px;
  min-width: 300px;
`;

const Label = styled.Text`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 6px;
  color: black;
`;

const Input = styled.TextInput`
  border-radius: ${(props) => props.borderRadius || 10}px;
  border: ${(props) => (props.error ? '2px solid red' : '2px solid #ccc')};
  padding: 10px;
  font-size: 16px;
`;

const ErrorText = styled.Text`
  color: red;
`;

function CustomInput({ label, placeholder, borderRadius = 10, secureText = false, showError = false, value, onChangeText, error, ...rest }) {
  return (
    <InputContainer>
      {label && <Label>{label}</Label>}
      <Input
        borderRadius={borderRadius}
        error={!!error}
        placeholder={placeholder}
        value={value}
        secureTextEntry={secureText}
        onChangeText={onChangeText}
        {...rest}        
      />
      {error && <ErrorText>{error}</ErrorText>}
    </InputContainer>
  );
}

export default CustomInput;
