import styled from 'styled-components/native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {Platform} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

import FeatherIcon from 'react-native-vector-icons/Feather';

export const GoBackContainer = styled(RectButton)`
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const MenuText = styled.Text`
  font-size: 16px;
  color: #34bbe1;
`;

export const Icon = styled(FeatherIcon)``;

export const HeaderContainer = styled.View`
  margin-left: 10px;
  flex-direction: row;
  margin-right: 5px;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  /* justify-content: center; */
  padding: 0px 30px ${Platform.OS === 'android' ? 100 : 20}px;
`;

export const Title = styled.Text`
  text-align: center;
  font-size: 24px;
  flex: 4;
  color: #000;
  font-weight: bold;
  font-family: 'RobotoSlab-Medium';
  margin: 20px 0 24px;
`;

export const BackToSignIn = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #312e38;
  border-top-width: 1px;
  border-color: #232129;
  padding: 16px 0 ${16 + getBottomSpace()}px;

  flex-direction: row;

  justify-content: center;
  align-items: center;
`;

export const BackToSignInText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
`;
