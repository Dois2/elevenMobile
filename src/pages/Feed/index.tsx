import React, {useState, useCallback, useEffect} from 'react';
import {ScrollView, Text, Alert} from 'react-native';

import {useAuth} from '../../hooks/user';

// import Post from '../../components/Post';
import FeedContent from '../../components/Feed';
import SearchInput from '../../components/SearchInput';
import api from '../../services/api';
import {useNavigation} from '@react-navigation/native';
import {
  HeaderContainer,
  Header,
  MenuContainer,
  IconButton,
  Icon,
  GoBackContainer,
  MenuText,
} from './styles';

// import { Container } from './styles';
interface PostState {
  id: number;
  title: string;
  author: string;
  content: string;
  date: string;
}

const Feed: React.FC = () => {
  const {user, setPost} = useAuth();

  const [posts, setPosts] = useState<PostState[]>([] as PostState[]);

  const [header, setheader] = useState('Publicações');

  const navigation = useNavigation();

  const loadPosts = useCallback(async () => {
    try {
      const apiResponse = await api.get<PostState[]>(`user/${user.id}/posts`);

      setPosts(apiResponse.data);
    } catch (error) {
      Alert.alert(
        'Erro ao processar suas informações.',
        'Ocorreu um erro ao carregar suas publicações.',
      );
    }
  }, [user.id]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const filterPosts = useCallback(
    async (value) => {
      const filteredPosts: PostState[] = [] as PostState[];

      posts.map((post) => {
        const foundIndex = post.content.indexOf(value);
        if (foundIndex > -1) {
          filteredPosts.push(post);
        }
      });
      setPosts(filteredPosts);
    },
    [posts],
  );

  return (
    <>
      <HeaderContainer>
        <MenuContainer>
          <GoBackContainer
            onPress={() => {
              navigation.navigate('SignIn');
            }}>
            <MenuText>Voltar</MenuText>
          </GoBackContainer>

          <Header>{header}</Header>

          <IconButton
            onPress={() => {
              navigation.navigate('UserProfile');
            }}>
            <Icon name="user" size={30} />
          </IconButton>
        </MenuContainer>
        <SearchInput
          icon="search"
          onChangeText={(value) => {
            if (value === '') {
              loadPosts();
              setheader('Publicações');
            } else {
              setheader('Buscar');
              filterPosts(value);
            }
          }}
        />
      </HeaderContainer>
      <ScrollView>
        {posts ? (
          posts.map((post) => {
            return (
              <FeedContent
                onPress={() => {
                  setPost(post);
                  navigation.navigate('Post');
                }}
                keyId={post.id}
                content={post.content}
                title={post.title}
                date={post.date}
                key={post.id}
              />
            );
          })
        ) : (
          <Text>Não foi possível achar sua publicação</Text>
        )}
      </ScrollView>
    </>
  );
};

export default Feed;
