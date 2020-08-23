import React, {useRef, useCallback} from 'react';
import {View, TextInput, Alert} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';
import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdow';

import {
  Container,
  Title,
  HeaderContainer,
  GoBackContainer,
  MenuText,
  Icon,
} from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  avatar: string;
  product_id: number;
  password: string;
}
const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const dropDownRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        data.product_id = Number(data.product_id);

        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          product_id: Yup.string().required('Produto Obrigatório'),
          password: Yup.string().min(
            6,
            'A senha deve conter mais de seis dígitos',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('user', data);

        Alert.alert(
          'Cadastro realizado com sucesso!',
          'Você já pode fazer o login na aplicação.',
        );

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          Alert.alert(
            'Erro no cadastro.',
            'Por favor valide as informações acima e tente novamente.',
          );

          formRef.current?.setErrors(errors);
          return;
        }

        Alert.alert('Erro no cadastro', '' + err);
      }
    },
    [navigation],
  );

  return (
    <>
      <View style={{flex: 1}}>
        {/* <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex: 1}}> */}
        <Container>
          <HeaderContainer>
            <GoBackContainer
              onPress={() => {
                navigation.navigate('SignIn');
              }}>
              <Icon name="x" />
            </GoBackContainer>
            <Title>Registrar</Title>
            <GoBackContainer
              onPress={() => {
                navigation.navigate('SignIn');
              }}>
              <MenuText>Login</MenuText>
            </GoBackContainer>
          </HeaderContainer>
          <Form ref={formRef} onSubmit={handleSignUp}>
            <Input
              autoCapitalize="words"
              name="name"
              icon="user"
              placeholder="Nome"
              returnKeyType="next"
              onSubmitEditing={() => emailInputRef.current?.focus()}
            />

            <Input
              ref={emailInputRef}
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              name="email"
              icon="mail"
              placeholder="E-mail"
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />

            <Dropdown
              ref={dropDownRef}
              placeholder="E-mail"
              returnKeyType="next"
              icon="user"
              name="product_id"
            />

            <Input
              ref={passwordInputRef}
              secureTextEntry
              name="password"
              icon="user"
              placeholder="Senha"
              textContentType="newPassword"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />

            <Button
              color="#34bbe1"
              onPress={() => {
                formRef.current?.submitForm();
              }}>
              Cadastrar
            </Button>
          </Form>
        </Container>
        {/* </ScrollView> */}
      </View>
    </>
  );
};

export default SignUp;
