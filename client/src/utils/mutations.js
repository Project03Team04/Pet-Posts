import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_POST = gql`
mutation AddPost($postText: String!, $postVideo: String, $postImage: String) {
  addPost(postText: $postText, postVideo: $postVideo, postImage: $postImage) {
    createdAt
    postAuthor
    postVideo
    postText
    _id
    postImage
    comments {
      _id
      commentText
      commentAuthor
      createdAt
    }
  }
}
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentText: String!) {
    addComment(postId: $postId, commentText: $commentText) {
      _id
      postText
      postImage
      postVideo
      postAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const EDIT_USER_PROFILE = gql`
  mutation editUserProfile( $username: String!, $email: String!, $bio: String!) {
    editUserProfile( username: $username, email: $email, bio: $bio) {
      _id
      username
      email
      bio
    }
  }`
export const LIKE_POST = gql`
mutation Mutation($postId: ID!) {
  likePost(postId: $postId) {
    postAuthor
    postText
    likes
  }
}
`;