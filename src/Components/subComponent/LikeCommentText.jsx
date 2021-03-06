import React from "react";
import { Dialog, DialogTitle, List } from "@material-ui/core";
import CommentEdit from "../subComponent/CommentEdit";

const LikeCommentText = ({
	likes,
	comment,
	postItems,
	postComments,
	postId,
}) => {
	const [open, setOpen] = React.useState(false);
	const [open1, setOpen1] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = (value) => {
		setOpen(false);
	};

	const handleClickOpen1 = () => {
		setOpen1(true);
    setScroll('paper')
	};
	const handleClose1 = (value) => {
		setOpen1(false);
	};

	return (
		<div className='flex justify-between items-center p-4'>
			<button
				onClick={handleClickOpen}
				className='hover:text-white transition-all ease-in-out'
			>
				{likes} likes
			</button>
			<button onClick={handleClickOpen1}>{comment} comments</button>
			<Dialog open={open}  onClose={handleClose}>
				<DialogTitle>Hello world</DialogTitle>
				<List>
					{[1, 2, 3].map((item) => (
						<p key={item.toString()}>{item}</p>
					))}
				</List>
			</Dialog>
			<Dialog fullWidth={true} scroll={scroll} open={open1} onClose={handleClose1}>
				<DialogTitle>Comments</DialogTitle>
				<List>
					{/* {postComments.map(comment => (<p>{comment.user.email}</p>))} */}
					{postComments?.map((item) => (
						<CommentEdit
							key={item._id}
							title={item.title}
							commentId={item._id}
							postId={postId}
						/>
					))}
				</List>
			</Dialog>
		</div>
	);
};

export default LikeCommentText;
