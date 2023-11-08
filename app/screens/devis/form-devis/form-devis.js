import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import CustomInput from '@app/components/ui/input';
import styled from 'styled-components/native';
import Screen from '@app/components/ui/screen';
import CustomButton from '@app/components/ui/button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import DevisActions from '@app/redux/devis/actions.js';

const SContainer = styled.View`
  flex: 1;
  background-color: #ac6782;
  padding-horizontal: 20px;
  padding-top: 40px;
`;

const STextLabelTTC = styled.Text`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
  color: black;
`;

const STextPriceTTC = styled.Text`
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 20px;
  color: black;
`;

// Fonction de validation avec des regex
const validateField = (field, value, regex, errorStateSetter) => {
  if (!regex.test(value)) {
    errorStateSetter(`Le champ ${field} est invalide`);
    return false;
  } else {
    errorStateSetter('');
    return true;
  }
};

const Devis = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [designation, setDesignation] = useState('');
  const [description, setDescription] = useState('');
  const [priceHT, setPriceHT] = useState('');
  const [priceTTC, setPriceTTC] = useState('');

  const [designationError, setDesignationError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [priceHTError, setPriceHTError] = useState('');

  // Vérifie s'il y a un devis passé en tant que paramètre de navigation
  const initialDevis = route.params?.devis || null;

  // Si un devis est passé, préremplir les champs du formulaire avec les valeurs du devis
  useEffect(() => {
    if (initialDevis) {
      setDesignation(initialDevis.designation);
      setDescription(initialDevis.description);
      setPriceHT(initialDevis.priceHT.toString());
      calculatePriceTTC(initialDevis.priceHT.toString());
    }
  }, [initialDevis]);

  const calculatePriceTTC = (price) => {
    const priceHTNumber = parseFloat(price);
    if (!isNaN(priceHTNumber)) {
      const priceTTCNumber = priceHTNumber + 0.2 * priceHTNumber;
      setPriceTTC(priceTTCNumber.toFixed(2));
    }
  };

  const handlePriceHTChange = (text) => {
    const parts = text.split('.');
    if (parts.length === 2) {
      const integer = parts[0].slice(0, 5);
      const decimal = parts[1].slice(0, 2);
      text = `${integer}.${decimal}`;
    } else if (parts.length === 1) {
      text = parts[0].slice(0, 5);
    }
    calculatePriceTTC(text);
    setPriceHT(text);
  };

  const saveDevis = async () => {
    // Vérification d'erreurs
    const isDesignationValid = validateField('Désignation', designation, /^.{1,255}$/, setDesignationError);
    const isDescriptionValid = validateField('Description', description, /^.{1,255}$/, setDescriptionError);
    const isPriceHTValid = validateField('Prix HT', priceHT, /^\d{1,5}(\.\d{0,2})?$/, setPriceHTError);

    if (isDesignationValid && isDescriptionValid && isPriceHTValid) {
      let devis = {};
      devis.id = initialDevis ? initialDevis.id : uuidv4();
      devis.designation = designation;
      devis.description = description;
      devis.priceHT = priceHT;
      devis.priceTTC = priceTTC;
      devis.type = "devis";

      try {
        await AsyncStorage.setItem(devis.id, JSON.stringify(devis));
        //Appel du webservice pour ajouter un devis
        dispatch(DevisActions.addDevis(designation, description, priceHT, priceTTC));
      } catch (e) {
        console.error("Error while saving in local", e);
      }
      navigation.replace('BottomBar');
    }
  }

  const showConfirmationAlert = () => {
    Alert.alert('Transformer le devis en facture ?',
      "Vous êtes sur le point de transformer votre devis en facture, en êtes vous sur ? ", [
      {
        text: 'Annuler',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Transformer', onPress: () => transformToFacture() },
    ])
  }

  //modifier l'objet en localstorage et le passer en mode 'facture'.
  const transformToFacture = async () => {
    const isDesignationValid = validateField('Désignation', designation, /^.{1,255}$/, setDesignationError);
    const isDescriptionValid = validateField('Description', description, /^.{1,255}$/, setDescriptionError);
    const isPriceHTValid = validateField('Prix HT', priceHT, /^\d{1,5}(\.\d{0,2})?$/, setPriceHTError);

    if (isDesignationValid && isDescriptionValid && isPriceHTValid) {
      let facture = {};
      facture.id = initialDevis ? initialDevis.id : uuidv4();
      facture.designation = designation;
      facture.description = description;
      facture.priceHT = priceHT;
      facture.priceTTC = priceTTC;
      facture.type = "facture";

      try {
        await AsyncStorage.setItem(facture.id, JSON.stringify(facture));
        Alert.alert('Transformation réussie ! ',
          "Votre devis est désormais disponible dans votre section Facture en tant que telle !", [
          {
            text: 'Revenir',
            onPress: () => null,
            style: 'cancel',
          },
        ])
      } catch (e) {
        console.error("Error while saving in local", e);
      }
      navigation.replace('BottomBar');
    }
  }

  const deleteDevis = async () => {
    try {
      await AsyncStorage.removeItem(initialDevis.id)
    } catch (e) {
      console.error('Error while removing from async', e);
    }
    navigation.replace('BottomBar');
  }

  return (
    <Screen preset="scroll">
      <SContainer>
        <CustomInput
          placeholder="Désignation"
          value={designation}
          onChangeText={(text) => setDesignation(text)}
          maxLength={255}
          label="Désignation"
          error={designationError}
        />
        <CustomInput
          placeholder="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
          multiline
          label="Description"
          error={descriptionError}
        />
        <CustomInput
          placeholder="Prix HT"
          value={priceHT}
          onChangeText={(text) => handlePriceHTChange(text)}
          keyboardType="numeric"
          label="Prix HT"
          error={priceHTError}
        />
        <STextLabelTTC>Prix TTC</STextLabelTTC>
        <STextPriceTTC>{priceTTC} €</STextPriceTTC>
        <CustomButton
          text={initialDevis ? "Modifier le devis" : "Ajouter le devis"}
          backgroundColor="#5f9ea0"
          textColor="#fff"
          textSize={20}
          onPress={saveDevis}
        />
        {initialDevis && (
          <>
            <CustomButton
              text="Transformer en facture"
              backgroundColor="#5f9ea0"
              textColor="#fff"
              textSize={20}
              onPress={showConfirmationAlert}
            />
            <CustomButton
              text="Supprimer"
              backgroundColor="#a52a2a"
              textColor="#fff"
              textSize={20}
              onPress={deleteDevis}
            />
          </>
        )}
        <CustomButton
          text="Annuler"
          textColor="#000"
          textSize={20}
          onPress={() => navigation.replace('BottomBar')}
        />
      </SContainer>
    </Screen>
  );
};

export default Devis;
