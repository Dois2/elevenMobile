import React from 'react';

import {Container, Title, Author, Content, Img, ImageContainer} from './styles';
import logoImg from '../../assets/baixados.png';

interface PostProps {
  id: number;
  title: string;
  author: string;
  content: string;
}

const Post: React.FC<PostProps> = ({title, author, content}) => {
  const text = content.replace(/<p>/g, '').split('</p>');

  return (
    <Container>
      <ImageContainer>
        <Img source={logoImg} />
      </ImageContainer>
      <Title>{title}</Title>
      <Author>{author}</Author>
      {text.map((paragraph) => {
        return <Content>{paragraph}</Content>;
      })}
    </Container>
  );
};

export default Post;
