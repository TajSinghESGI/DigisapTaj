import React from 'react';
import styled from 'styled-components/native';

const CustomButtonContainer = styled.TouchableOpacity`
  background-color: ${(props) => props.backgroundColor};
  padding: 10px 20px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const CustomButtonText = styled.Text`
  color: ${(props) => props.textColor || '#fff'};
  font-size: ${(props) => props.textSize || 16}px;
  font-weight: bold;
`;

const CustomButton = ({marginTop = 0, width='100%', text, backgroundColor = "white", textColor, textSize, onPress }) => {
  return (
    <CustomButtonContainer style={{marginTop: marginTop, width: width}} activeOpacity={0.8} backgroundColor={backgroundColor} onPress={onPress}>
      <CustomButtonText textColor={textColor} textSize={textSize}>
        {text}
      </CustomButtonText>
    </CustomButtonContainer>
  );
};

export default CustomButton;
