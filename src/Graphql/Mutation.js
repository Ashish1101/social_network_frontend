import {gql} from '@apollo/client'

export const REGISTER_USER = gql`
  mutation addUser($email:String! , $password:String!) {
      addUser(email:$email , password:$password) {
          handle
          email
          msg
          _id
      }
  }
`

export const LOGIN_USER = gql`
  mutation loginUser($email:String! , $password:String!) {
      loginUser(email:$email , password:$password) {
         token
         userId
      }
  }
`
export const CREATE_POST = gql`
   mutation CREATE_POST($title:String!) {
       createPost(title:$title) {
         _id
         title
         user {
           email
           handle
           _id
         }
       }
   }
`

export const LIKE_POST = gql`
   mutation LIKE_POST($postId:ID!) {
       likePost(postId:$postId)
   }
`