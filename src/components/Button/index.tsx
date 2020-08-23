import React from 'react';
import {RectButtonProperties} from 'react-native-gesture-handler';

import {Container, ButtonText} from './styles';

interface ButtonProps extends RectButtonProperties {
  color: string;
  children: string;
}

const Button: React.FC<ButtonProps> = ({color, children, ...rest}) => {
  return (
    <Container color={color} {...rest}>
      <ButtonText>{children}</ButtonText>
    </Container>
  );
};

export default Button;
