import styled, {css} from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {Picker} from '@react-native-community/picker';

interface Containerprops {
  isFocus: boolean;
  isErrored: boolean;
}

export const Container = styled.View<Containerprops>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #f6f6f6;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: #f6f6f6;

  flex-direction: row;
  align-items: center;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocus &&
    css`
      border-color: #34bbe1;
    `}
`;

export const PickerLine = styled(Picker)`
  flex: 1;
  color: #6666;
  font-size: 16px;
  font-family: RobotoSlab-Regular;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
