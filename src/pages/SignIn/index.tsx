import React, {useCallback, useRef} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';

import {useAuth} from '../../hooks/user';

import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {Container, Title, ForgotPassword, ForgotPasswordText} from './styles';

import api from '../../services/api';

interface SignInFormData {
  email: string;
  password: string;
}
interface ApiResponse {
  users: User[];
}

interface User {
  name: string;
  email: string;
  avatar: string;
  password: string;
  product_id: number;
  id: number;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const passwordInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const {setUser} = useAuth();

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        const {email, password} = data;
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const users = await api.get<ApiResponse>('user');

        const logeduser = users.data.users.find(
          (user) => user.password === password && user.email === email,
        );

        if (logeduser) {
          setUser(logeduser);
          navigation.navigate('Feed');
        } else {
          Alert.alert(
            'Usuário ou senha inválidos',
            'Por favor valide suas credenciais e tente novamente.',
          );
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer o login. Verifique as credenciais: .' + err,
        );
      }
    },
    [navigation, setUser],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex: 1}}>
          <Container>
            <View>
              <Title>Acessar</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />

              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <Button
                color="#34bbe1"
                onPress={() => {
                  formRef.current?.submitForm();
                }}>
                Entrar
              </Button>
              <ForgotPassword>
                <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
              </ForgotPassword>
              <Button
                color="#666666"
                onPress={() => {
                  navigation.navigate('SignUp');
                }}>
                Cadastrar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignIn;
