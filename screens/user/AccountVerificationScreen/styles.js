import styled from "styled-components/native";
import Colors from "../../../constants/Colors";
export const OTPInputContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const TextInputHidden = styled.TextInput`
  position: absolute;
  opacity: 0;
`;

export const SplitOTPBoxesContainer = styled.Pressable`
  width: 80%;
  flex-direction: row;
  justify-content: space-evenly;
  border-color: Colors.primary;

`;
export const SplitBoxes = styled.View`
  border-color: Colors.primary;
  border-width: 2px;
  border-radius: 5px;
  padding: 12px;
  min-width: 50px;
`;

export const SplitBoxText = styled.Text`
  font-size: 20px;
  text-align: center;
  color: Colors.primary;
`;

export const SplitBoxesFocused = styled(SplitBoxes)`
  border-color: #ecdbba;
  background-color: grey;
`;

export const ButtonContainer = styled.TouchableOpacity`
  background-color: #000000;
  padding: 8px;
  justify-content: center;
  align-items: center;
  width: 265px;
  margin-top: 30px;
  borderRadius:20px
`;

export const ButtonText = styled.Text`
  color: black;
  font-size: 20px;
`;