import React, { useState } from "react";
import {
	DialogTitle,
	TextField,
	DialogContent,
	DialogActions,
	Button,
    CircularProgress
} from "@material-ui/core";
import { useMutation } from '@apollo/client'
import {LOGIN_USER} from '../../Graphql/Mutation'
import {useHistory} from 'react-router-dom'
const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// const [confirmPassword, setConfirmPassword] = useState("");
	const history = useHistory();
    const [loginUser , {data , loading , error}] = useMutation(LOGIN_USER , {
		onCompleted({loginUser}) {
			console.log('useer data ', data)
			localStorage.setItem('token' , loginUser?.token);
			localStorage.setItem('userId' , loginUser?.userId);
			history.push('/dashboard')
		}
	});


    

    const submitForm = (e) => {
        e.preventDefault();
		console.log('submitted')
        loginUser({variables:{email , password}}).then(data => {
			console.log('data' , data)
		
		}).catch(err => console.log('err' , err)) 
    }

    if(loading) {
		console.log('data' , data);
		console.log('error' , error)
        return <CircularProgress color="primary" />
    }

	return (
	
			<form>
                {error && (<p>{error?.message}</p>)}
				{/* {data  && (<p className="text-green-500 text-center">{data?.addUser?.msg}</p>)} */}
				<DialogTitle id='form-dialog-title' className='text-center'>
					Login <span className='text-blue-400'>Social</span>
				</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin='dense'
						id='email'
						label='Email Address'
						type='email'
						fullWidth
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</DialogContent>
				<DialogContent>
					<TextField
						autoFocus
						margin='dense'
						id='password'
						label='password'
						type='password'
						fullWidth
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</DialogContent>
                <DialogActions className="mr-16">
                    
				<Button
					variant={"outlined"}
					
					color='primary'
					onClick={submitForm}
				>
					Submit
				</Button>
                </DialogActions>
			</form>
	);
};

export default Register;
