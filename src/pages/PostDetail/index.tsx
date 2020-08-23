import React from 'react';
import {ScrollView} from 'react-native';

import Post from '../../components/Post';
import {useAuth} from '../../hooks/user';

const PostDetail: React.FC = () => {
  const {post} = useAuth();

  return (
    <ScrollView>
      <Post
        id={post.id}
        title={post.title}
        author={post.author}
        content={post.content}
      />
    </ScrollView>
  );
};

export default PostDetail;
