import styled, {css} from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

interface Containerprops {
  color: string;
}

export const Container = styled(RectButton)<Containerprops>`
  width: 350px;
  height: 60px;

  ${(props) =>
    props.color &&
    css`
      background: ${props.color};
    `}

  border-radius: 25px;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
`;

export const ButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #fff;
  font-size: 18px;
`;
