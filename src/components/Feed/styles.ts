import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
// import {FeatherIcon} from 'react-native-vector-icons/Feather';

export const Container = styled(RectButton)`
  margin-left: 10px;
  margin-right: 5px;
  margin-top: 15px;
`;

export const Header = styled.Text`
  font-weight: bold;
  font-size: 28px;
  margin-top: 15px;
`;

export const Author = styled.Text`
  font-size: 16px;
  margin-top: 8px;
`;

export const DateText = styled.Text`
  margin-top: 8px;
  font-size: 16px;

  color: #c5c5c5;
`;

export const ImageContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Img = styled.Image`
  justify-content: center;
`;
