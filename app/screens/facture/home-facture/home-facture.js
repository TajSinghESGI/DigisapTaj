import React, { useEffect, useState, useMemo } from 'react';
import { View, FlatList } from 'react-native';
import styled from 'styled-components/native';
import CustomButton from '@app/components/ui/button';
import { SCREEN_NAMES } from '@app/navigation/navigation.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DevisCard from '@app/components/devis/card';
import { useIsFocused } from '@react-navigation/native';
import Screen from '@app/components/ui/screen';
import AuthActions from '@app/redux/auth/actions.js';
import { useDispatch } from 'react-redux';

const SContainer = styled.View`
  flex: 1;
  padding-top: 40px;
  padding-horizontal: 20px;
  background-color: #ac6782;
`;

const SContainerEmpty = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #ac6782;
  padding-top: 20px;
  padding-horizontal: 20px;
`;

const STextEmpty = styled.Text`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const STextMsg = styled.Text`
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const HomeFacture = ({ navigation }) => {
  const dispatch = useDispatch();
  const [listOfFactures, setListOfFactures] = useState([]);
  const isFocused = useIsFocused();

  const getAllDataFromAsync = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      let list = result.map(req => JSON.parse(req[1]));
      setListOfFactures(list.filter(facture => facture.type === "facture"));
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAllDataFromAsync();
  }, [isFocused, listOfFactures.length]);

  const handleAddButtonPressed = () => {
    navigation.navigate(SCREEN_NAMES.FACTURE.FORM_FACTURE);
  };

  const renderEmptyScreen = () => {
    return (
      <SContainerEmpty>
        <STextEmpty>Vous n'avez pas encore de Factures !</STextEmpty>
        <CustomButton
          text="Ajouter une Facture"
          backgroundColor="#5f9ea0"
          textColor="#fff"
          textSize={20}
          onPress={handleAddButtonPressed}
        />
      </SContainerEmpty>
    );
  }

  const handleClickOnFacture = (facture) => {
    navigation.navigate(SCREEN_NAMES.FACTURE.FORM_FACTURE, { facture: facture })
  }

  const renderItemList = ({ item }) => {
    return (
      <DevisCard
        designation={item.designation}
        description={item.description}
        priceHT={item.priceHT}
        priceTTC={item.priceTTC}
        onPress={() => handleClickOnFacture(item)}
      />
    )
  }

  const logout = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
    }
    dispatch(AuthActions.logout());
  }

  const renderList = () => {
    return (
      <SContainer>
        <View flexDirection="row" alignItems="center" justifyContent="space-around">
          <STextMsg>Vos Factures</STextMsg>
          <CustomButton text="Déconnexion"
            backgroundColor="#5f9ea0"
            textColor="#fff"
            textSize={20}
            width={'50%'}
            onPress={logout} />
        </View>
        <FlatList
          data={listOfFactures}
          keyExtractor={(item) => item.id}
          renderItem={renderItemList}
          contentContainerStyle={{ flexGrow: 1 }}
        />
        <CustomButton
          text="Ajouter une Facture"
          backgroundColor="#5f9ea0"
          textColor="#fff"
          textSize={20}
          onPress={handleAddButtonPressed}
        />
      </SContainer>
    );
  }

  const renderContent = useMemo(() => {
    if (listOfFactures.length === 0) {
      return renderEmptyScreen();
    } else {
      return renderList();
    }
  }, [listOfFactures]);

  return <Screen>{renderContent}</Screen>
};

export default HomeFacture;