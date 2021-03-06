import React from "react";
import { CircularProgress, Divider } from "@material-ui/core";
import ImageSection from "../Layout/ImageSection";
import { SINGLE_POST } from "../../Graphql/Query";
import { useQuery } from "@apollo/client";

//components
import PostHeader from "../subComponent/PostHeader";
import PostTitle from "../subComponent/PostTitle";
import LikeCommentText from "../subComponent/LikeCommentText";
import PostActions from "../subComponent/PostActions";
const url =
	"https://images.pexels.com/photos/6151199/pexels-photo-6151199.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";
const url1 =
	"https://images.pexels.com/photos/6752261/pexels-photo-6752261.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260";
const Post = ({ postId }) => {
	const { data, loading, error } = useQuery(SINGLE_POST, {
		variables: { _id: postId },
	});
	console.log("single post data", data?.readSinglePost);
	const name = data?.readSinglePost?.user?.handle.split("@");

	return (
		<div className=' bg-gray-300 dark:bg-gray-700 rounded-md mt-2 mb-2'>
			{error && <p>{error.message}</p>}
			{loading && <CircularProgress />}
			<div className='flex justify-between items-center p-2'>
				<PostHeader name={name} _id={data?.readSinglePost?._id} />
			</div>
			<div>
				<div className='p-2'>
					<PostTitle title={data?.readSinglePost?.title} />
				</div>
				<div className='max-h-80 dark:bg-gray-500 bg-white'>
					<ImageSection url={url} alt='Hello' />
				</div>
				<div className='flex flex-col'>
					<LikeCommentText
						likes={data?.readSinglePost?.likes.length}
						comment={data?.readSinglePost?.comments.length}
						postItems = {data?.readSinglePost?.likes}
						postComments={data?.readSinglePost?.comments}
						postId={postId}
					/>
					<Divider />
					<div >
						<PostActions likes={data?.readSinglePost?.likes} postId={postId} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Post;
