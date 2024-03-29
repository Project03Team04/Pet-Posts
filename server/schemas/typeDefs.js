const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    bio: String
    posts: [Post]!
  }

  type Post {
    _id: ID
    postText: String
    postImage: String
    postAuthor: String
    postVideo: String
    createdAt: String
    comments: [Comment]!
    likes: Int #includes like filed in the Post type
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    posts(username: String): [Post]
    post(postId: ID!): Post
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPost(postText: String!, postImage: String, postVideo:String): Post
    addComment(postId: ID!, commentText: String!): Post
    removePost(postId: ID!): Post
    removeComment(postId: ID!, commentId: ID!): Post
    editUserProfile(username: String!, email: String!, bio: String!): User
    likePost(postId: ID!): Post #add likePost mutation
  }
`;

module.exports = typeDefs;