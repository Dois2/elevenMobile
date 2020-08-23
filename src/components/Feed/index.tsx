import React from 'react';
import {parseISO, formatDistance} from 'date-fns';

import {
  Container,
  Header,
  Author,
  DateText,
  Img,
  ImageContainer,
} from './styles';
import logoImg from '../../assets/baixados.png';
import {RectButtonProperties} from 'react-native-gesture-handler';

interface PostProps extends RectButtonProperties {
  keyId: number;
  title: string;
  content: string;
  date: string;
}

const FeedContent: React.FC<PostProps> = ({
  keyId,
  title,
  content,
  date,
  ...rest
}) => {
  var result = formatDistance(parseISO(date), new Date());

  const parsedContent = content
    .replace(/<p>/g, '')
    .substring(0, 150)
    .concat('...');

  return (
    <Container key={keyId} {...rest}>
      <ImageContainer>
        <Img source={logoImg} />
      </ImageContainer>
      <Header>{title}</Header>
      <Author>{parsedContent}</Author>
      <DateText>{result}</DateText>
    </Container>
  );
};

export default FeedContent;
