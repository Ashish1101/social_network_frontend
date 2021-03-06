import React , {useState} from 'react'
import {Button, Grid , TextField } from '@material-ui/core'
import {AccountCircle} from '@material-ui/icons'
import {ADD_COMMENT} from '../../Graphql/Mutation'
import {SINGLE_POST} from '../../Graphql/Query'
import {useMutation} from '@apollo/client'
import produce from 'immer'
const AddComment = ({postId}) => {
    const [title , setTitle] = useState('');

    //add comment and add it to the cache
    const [addComment] = useMutation(ADD_COMMENT , {
        update(cache , {data}) {
            const newComment = data?.addComment
            const existingComments = cache.readQuery({
                query: SINGLE_POST,
                variables: {_id:postId}
            })

            cache.writeQuery({
                query:SINGLE_POST,
                variables:{_id:postId},
                data: produce(existingComments , x => {
                    x?.readSinglePost?.comments.push(newComment)
                })
            })
        }
    })

    const addCommentToPost = (e) => {
        e.preventDefault()
         addComment({variables:{title:title , postId:postId}}).then((res) => {
             console.log('working find added comment' , res)
         }).catch(err => console.log(err))
         setTitle('')
    }

    return (
        <>
         <form className="flex justify-between items-center">
         <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField onChange={(e) => setTitle(e.target.value)}  label="write comment" />
          </Grid>
        </Grid>
        <Button onClick={addCommentToPost}>
            Add
        </Button>
         </form>   
        </>
    )
}

export default AddComment

