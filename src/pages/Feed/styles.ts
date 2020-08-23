import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const HeaderContainer = styled.View`
  margin-left: 10px;
  margin-right: 5px;
  justify-content: center;
  align-items: center;
`;

export const GoBackContainer = styled(RectButton)`
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const IconContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;

  width: 60px;
  height: 60px;
`;

export const MenuContainer = styled.View`
  width: 100%;
  height: 60px;

  flex-direction: row;

  align-items: center;
`;
export const ContentContainer = styled.View`
  margin-left: 10px;
  margin-right: 5px;
`;

export const Icon = styled(FeatherIcon)`
  color: #34bbe1;
  justify-content: center;
  align-self: center;
`;

export const IconButton = styled(RectButton)`
  text-align: center;

  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex: 1;
`;

export const Header = styled.Text`
  font-weight: bold;
  font-size: 28px;
  flex: 3;
  text-align: center;
`;

export const MenuText = styled.Text`
  font-size: 16px;
  color: #34bbe1;
`;

export const Author = styled.Text`
  font-weight: bold;
  font-size: 16px;
  margin-top: 6px;
`;

export const Content = styled.Text`
  margin-top: 15px;
  font-size: 16px;
  font-weight: bold;
`;

export const Img = styled.Image``;
