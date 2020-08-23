import React, {useEffect, useCallback, useState} from 'react';
import {useAuth} from '../../hooks/user';
import {Form} from '@unform/mobile';

import {
  HeaderContainer,
  BodyContainer,
  UserImage,
  Header,
  UserName,
  FormContainer,
} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Imagem from '../../assets/baixados.png';
import {useNavigation} from '@react-navigation/native';

import api from '../../services/api';
import {Alert} from 'react-native';

interface ApiResponse {
  products: Product[];
}

interface Product {
  id: number;
  name: string;
}

interface User {
  name: string;
  email: string;
  avatar: string;
  password: string;
  product_id: number;
  id: number;
}

const UserProfile: React.FC = () => {
  const navigation = useNavigation();
  const {user, setUser} = useAuth();

  const [product, setProduct] = useState<Product>({} as Product);

  const loadProducts = useCallback(async () => {
    try {
      const apiResponse = await api.get<ApiResponse>('products');

      const userProduct = apiResponse.data.products.find(
        (product) => product.id === user.product_id,
      );

      if (userProduct) {
        setProduct(userProduct);
      }
    } catch (error) {
      Alert.alert(
        'Ocorreu um erro na sua sessão.',
        'Houve um erro interno para carregar seu produto',
      );
    }
  }, [user.product_id]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {}, []);

  return (
    <>
      <HeaderContainer>
        <Header>Perfil</Header>
      </HeaderContainer>
      <BodyContainer>
        <UserImage source={Imagem} />
        <UserName>{user.name}</UserName>
        <FormContainer>
          <Form onSubmit={() => {}}>
            <Input
              name="product"
              icon="user"
              editable={false}
              defaultValue={product.name}
            />
            <Input
              name="email"
              icon="mail"
              editable={false}
              defaultValue={user.email}
            />
            <Button
              color="#34bbe1"
              onPress={() => {
                setUser({} as User);
                navigation.navigate('SignIn');
              }}>
              Sair
            </Button>
          </Form>
        </FormContainer>
      </BodyContainer>
    </>
  );
};

export default UserProfile;
