import React, { useState } from 'react'
import {Avatar , Button, CircularProgress} from '@material-ui/core'
import {LinearScale} from '@material-ui/icons'
import {useMutation} from '@apollo/client'
import {DELETE_POST} from '../../Graphql/Mutation'
import {GET_ALL_POST} from '../../Graphql/Query'
import produce from 'immer'

const PostHeader = ({name , _id}) => {
    const [showModal , setShowModal] = useState(false)
    const [deletePost ,  {loading}] = useMutation(DELETE_POST, {
        update(cache , {data}) {
            const deleteItem = data?.deletePost
            const existingItem = cache.readQuery({
                query:GET_ALL_POST
            })

            cache.writeQuery({
                query:GET_ALL_POST,
                data : produce(existingItem , x => {
                    x.readPostsOfUser.posts.splice(deleteItem, 1)
                })
            })
        }
    })
    
     const deletePostHandler = () => {
        deletePost({variables:{_id:_id}}).then((res) => {
            console.log('post delete successfully' , res)
        }).catch((err) => console.log('err in deleting post' , err))
    } 

    return (
        <>
        <div className='flex items-center space-x-1'>
        {loading && <CircularProgress color="primary" />}
        <Avatar />
        <div>
            <h2 className='text-lg' >{name}</h2>
        </div>
    </div>
    <div>
        <div onClick={() => setShowModal(!showModal)} >
           <LinearScale color='secondary'  />
        </div>
        <div className={`w-24 h-24 absolute  shadow-md ${showModal === false ? 'hidden' : 'block'} `} style={{right:250}} >
           <div className="flex flex-col">
           <Button onClick={deletePostHandler} color="secondary" variant="contained"  >
               Delete
           </Button>
           <Button variant="contained" color="primary">
               Edit
           </Button>
           </div>
        </div>
    </div>
        </>
    )
}

export default PostHeader
