import React , {useState} from "react";
import {Button } from '@material-ui/core'
import {ThumbDown , ThumbUp , Comment , Share} from '@material-ui/icons'
import { LIKE_POST } from "../../Graphql/Mutation";
import { SINGLE_POST } from "../../Graphql/Query";
import { useMutation } from "@apollo/client";
import produce from "immer";

//componets
import AddComment from '../Screen/AddComment'

const PostActions = ({likes , postId}) => {

    const [open , setOpen] = useState(false)

	const userId = localStorage.getItem("userId");
    const [likePost] = useMutation(LIKE_POST, {
		update(cache, { data }) {
			const newData = data?.likePost;
			const existingLikes = cache.readQuery({
				query: SINGLE_POST,
				variables: { _id: postId },
			});

			cache.writeQuery({
				query: SINGLE_POST,
				variables: { _id: postId },
				data: produce(existingLikes, (x) => {
					x?.readSinglePost?.likes.push(newData);
					//x here is the data of Single Post
				}),
			});
		},
	});

	const postLikeHandler = (e) => {
		e.preventDefault();

		likePost({ variables: { postId: postId } })
			.then((res) => {
				console.log("result ", res);
			})
			.catch((err) => console.log(err));
	};


	return (
		<>
			<div className="flex flex-col">
              <div className="flex">
              <Button
				className='w-full'
				// {likes.includes(userId) ? () : (startIcon={<ThumbUp />})}
				startIcon={likes?.includes(userId) ? <ThumbDown /> : <ThumbUp />}
				onClick={postLikeHandler}
			>
				Like
			</Button>
			<Button className='w-full' onClick={(e) => setOpen(!open)} startIcon={<Comment />}>
				Comment
			</Button>
			<Button className='w-full' startIcon={<Share />}>
				Share
			</Button>
              </div>
              <div className={`px-12 md:px-16 ${open ? 'block' : 'hidden'} transition-all ease-in-out`}>
                  <AddComment postId={postId} />
              </div>
            </div>
		</>
	);
};

export default PostActions;
