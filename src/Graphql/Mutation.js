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
export const ADD_COMMENT = gql`
   mutation ADD_COMMENT($title:String! , $postId:ID!) {
       addComment(title:$title , postId:$postId) {
         _id
         title
         user {
           _id
           email
         }
       }
   }
`

export const DELETE_POST = gql`
     mutation DELETE_POST($_id:ID!) {
        deletePost(_id:$_id)
     }
`

export const EDIT_COMMENT = gql`
  mutation EDIT_COMMENT($commentId:ID! , $title:String!) {
      editComment(commentId:$commentId , title:$title)
  }
`

export const DELETE_COMMENT = gql`
   mutation DELETE_COMMENT($postId:ID! , $commentId:ID!) {
      deleteComment(postId:$postId , commentId:$commentId)
   }
`