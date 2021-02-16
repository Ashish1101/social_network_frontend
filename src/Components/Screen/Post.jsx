import React from "react";
import { Avatar , Button  , CircularProgress, Divider} from "@material-ui/core";
import {Comment, LinearScale, Share, ThumbUp} from '@material-ui/icons'
import ImageSection from '../Layout/ImageSection'
import {SINGLE_POST} from '../../Graphql/Query'
import {LIKE_POST} from '../../Graphql/Mutation'
import {useMutation, useQuery} from '@apollo/client'
const url = 'https://images.pexels.com/photos/6151199/pexels-photo-6151199.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
const url1 = 'https://images.pexels.com/photos/6752261/pexels-photo-6752261.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
const Post = ({postId}) => {
	const {data , loading , error} = useQuery(SINGLE_POST , {variables:{_id:postId}})
    console.log('single post data' , data?.readSinglePost)
	const name = data?.readSinglePost?.user?.handle.split('@')
    
	const [likePost] = useMutation(LIKE_POST)

	const postLikeHandler = (e) => {
        e.preventDefault()
        likePost({variables:{postId:postId}}).then((res) =>{
			console.log('result ' , res)
		}).catch(err => console.log(err))
	}

	return (
		<div className='bg-purple-900 dark:bg-gray-700 rounded-md mt-2 mb-2'>
			{error && (<p>{error.message}</p>)}
			{loading && (<CircularProgress  />)}
			<div className='flex justify-between items-center p-2'>
				<div className='flex items-center space-x-1'>
					<Avatar />
					<div>
						<h2 className="text-lg">{name}</h2>
					</div>
				</div>
				<div>
					<LinearScale color="secondary" />
				</div>
			</div>
			<div>
            <div className="p-2">
				<p className="text-sm text-white ">
			         {data?.readSinglePost?.title}
				</p>
			</div>
			 <div className="max-h-80 dark:bg-gray-500 bg-white">
                 <ImageSection url={url} alt="Hello" />
             </div>
             <div className="flex flex-col">
                 <div className="flex justify-between items-center p-4">
					 <div>{data?.readSinglePost?.likes?.length} likes</div>
					 <div>{data?.readSinglePost?.comments?.length} comments</div>
				 </div>
				 <Divider />
				 <div className="flex justify-evenly space-x-1 items-start">
					 <Button className="w-full" startIcon={<ThumbUp />} onClick={postLikeHandler}>Like</Button>
					 <Button className="w-full" startIcon={<Comment />}>Comment</Button>
					 <Button className="w-full" startIcon={<Share />}>Share</Button>
				 </div>
             </div>
            </div>
		</div>
	);
};

export default Post;
