import React , {useState} from 'react'
import {Avatar , TextField , Dialog , Button , DialogTitle , DialogActions  , DialogContent, CircularProgress} from '@material-ui/core'
import {useMutation} from '@apollo/client'
import {CREATE_POST} from '../../Graphql/Mutation'
import {GET_ALL_POST} from '../../Graphql/Query'
import {produce} from 'immer'
const PostForm = () => {
    
    const [open, setOpen] = useState(false);
    const [text , setText] = useState('');

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const [createPost , {data , loading , error}] = useMutation(CREATE_POST, {
      update(cache , {data}) {
        const newPost = data?.createPost;
       const existingPosts = cache.readQuery({
         query: GET_ALL_POST
       })

       cache.writeQuery({
         query : GET_ALL_POST,
         data : produce(existingPosts , x => {
           x.readPostsOfUser.posts.push(newPost)
         })
       })
      }
    })

    const submitPost = () => {
       createPost({variables : {title:text}}).then((res) => {
         console.log('post created' , res)
         handleClose();
       }).catch(err => console.log('err' , err))
    }

    if(loading) {
      return <CircularProgress />
    }
  
    return (
        <div className="flex md:justify-around justify-evenly items-center md:w-full h-20 dark:bg-gray-800 bg-purple-800 rounded-lg">
            <Avatar className="text-purple-400 md:ml-0 ml-2">OP</Avatar>
             <form className="md:w-11/12 md:pl-8 flex-grow pl-4 ">
             <TextField onClick={handleClickOpen} fullWidth={true} className="md:w-11/12 dark:hover:bg-gray-700 rounded-md transition-all ease-in-out hover:bg-purple-600"  size="small" id="outlined-basic" disabled label="Outlined" variant="outlined" />
             <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className="text-center">Crete Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="write post"
            type="text"
            fullWidth
            onChange={(e) => setText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
        <Button onClick={submitPost} color="primary">
            Subscribe
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
         
        </DialogActions>
      </Dialog>
             </form>
        </div>
    )
}

export default PostForm
