import React, {forwardRef} from 'react';
import {TextInputProps} from 'react-native';

import {Container, TextInput, Icon} from './styles';

interface InputProps extends TextInputProps {
  icon: string;
}

interface InputValueRefence {
  value: string;
}

interface InputRef {
  focus(): void;
}

const SearchInput: React.RefForwardingComponent<InputRef, InputProps> = ({
  icon,
  ...rest
}) => {
  return (
    <Container>
      <Icon name={icon} size={20} color={'#666360'} />
      <TextInput
        keyboardAppearance="dark"
        placeholder="Pesquisar"
        placeholderTextColor="#666360"
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(SearchInput);
