import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

const CardContainer = styled.TouchableOpacity`
  background-color: white;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 16px;
  elevation: 4; /* Pour l'ombre (Android) */
  shadow-offset: 0px 2px; /* Pour l'ombre (iOS) */
  shadow-color: black; /* Pour l'ombre (iOS) */
  shadow-opacity: 0.2; /* Pour l'ombre (iOS) */
`;

const Designation = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #000;
`;

const Description = styled.Text`
  font-size: 14px;
  color: #000;
`;

const Price = styled.Text`
  font-size: 16px;
  color: #000;
`;

const DevisCard = ({ designation, description, priceHT, priceTTC, onPress }) => {
  return (
    <CardContainer activeOpacity={0.8} onPress={onPress}>
      <Designation>{designation}</Designation>
      <Description>{description}</Description>
      <Price>Prix HT: {priceHT} €</Price>
      <Price>Prix TTC: {priceTTC} €</Price>
    </CardContainer>
  );
};

export default DevisCard;
