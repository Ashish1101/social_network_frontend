import React from 'react'
import PosstForm from './PostForm'
import Post from './Post'
import {useQuery} from '@apollo/client'
import {GET_ALL_POST} from '../../Graphql/Query'
import { CircularProgress , LinearProgress } from '@material-ui/core'

const Dashboard = () => {
   
   //read all user posts here and pass id of all post in post component
   const {data , loading , error} = useQuery(GET_ALL_POST , {
       fetchPolicy: 'cache-and-network'
   })
   console.log('data of posts' , data )

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="invisible md:visible">Hello world</div>
            <div className="col-span-2">
                <PosstForm />
                {loading && (<CircularProgress className="md:ml-72 md:mt-32 m-44" color="primary" size="3rem" />)}
                {data?.readPostsOfUser?.posts.map(item => <Post key={item._id} postId={item._id} />)}
            </div>
            <div className="md:visible invisible">Hello chat</div>
        </div>
    )
}

export default Dashboard
