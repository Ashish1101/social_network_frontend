import {gql} from '@apollo/client'


export const SINGLE_POST = gql`
query Post($_id:ID!) {
    readSinglePost(_id:$_id) {
            _id
            title
            user {
                email
                handle
            }
            likes {
               _id
            }
            comments{
                _id
                title
                user {
                    email
                }
            }
    }
}
`

export const GET_ALL_POST = gql`
   query POSTS{
      readPostsOfUser {
          posts {
              title
              _id
              createdAt
              comments {
                  _id
                  title
                  user {
                      email
                      handle
                  }
              }
          }
      }
   }
`