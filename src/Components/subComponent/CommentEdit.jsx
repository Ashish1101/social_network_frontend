import React, { useState } from 'react'
import { Avatar , Button , CircularProgress, IconButton } from '@material-ui/core'
import {Delete , Create} from '@material-ui/icons'
import {useMutation, useQuery } from '@apollo/client'
import {EDIT_COMMENT , DELETE_COMMENT} from '../../Graphql/Mutation'
import {SINGLE_POST} from '../../Graphql/Query'
import produce from 'immer'

const CommentEdit = ({title , commentId , postId}) => {
    const [newTitle , setNewTitle] = useState(title);
   
    const {refetch} = useQuery(SINGLE_POST)

    const [editComment , {loading}] = useMutation(EDIT_COMMENT)
    


    const editCommentHandler = (e) => {
        e.preventDefault()
        editComment({variables:{commentId:commentId , title:newTitle}})
        .then((res) => {
           console.log('new comment added')
        })
        .catch(err => console.log(err))
    }

    const [deleteComment ] = useMutation(DELETE_COMMENT , {
        update(cache , {data}) {
            const deleteItem  = data?.deleteComment
            const existingComments = cache.readQuery({
                query:SINGLE_POST,
                variables:{_id:postId}
            })

            cache.writeQuery({
                query:SINGLE_POST,
                variables:{_id:postId},
                data: produce(existingComments , x => {
                    x?.readSinglePost?.comments?.splice(deleteItem , 1)
                })
            })
        }
    })

    const commentDeleteHandler = () => {
        deleteComment({variables:{postId:postId , commentId: commentId}})
        .then((res) => {
            console.log('comment delete successfully' , res)
        }).catch(err => console.log('error in deleting comment' , err))
    }

    return (
        <div className="flex justify-between my-4">
            {loading && (<CircularProgress color="primary" />)}
            {/* {loading1 && (<CircularProgress color="primary" />)} */}
            <div className="flex space-x-2 items-center">
               <Avatar />
               <form>
                   <textarea value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="md:w-96 outline-none rounded-md transition-all ring-1 ring-purple-300 focus:ring-2 focus:ring-purple-300 pt-1 text-sm"
                     placeholder="edit comment" />
               </form>
            </div>
            <div className="flex space-x-4 px-4 items-center">
                <IconButton onClick={editCommentHandler} className="text-green-600">
                  <Create />
                </IconButton>
                <IconButton aria-label="delete" onClick={commentDeleteHandler} color="secondary">
                  <Delete  />
                </IconButton>
            </div>
        </div>
    )
}

export default CommentEdit
