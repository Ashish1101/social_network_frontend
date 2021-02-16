import React, { useState } from "react";
import {
	DialogTitle,
	TextField,
	DialogContent,
	DialogActions,
	Button,
	CircularProgress,
} from "@material-ui/core";

import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../Graphql/Mutation";
const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [addUser, { data, loading, error }] = useMutation(REGISTER_USER, {
		onError() {
			console.log('error from home' , error)
		}
	});

	const customError = new Error();

	const submitForm = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			customError.message = "Password do not match";
		} else {
			console.log("submitted");
			addUser({ variables: { email, password } })
				.then((data) => {
					console.log("data", data);
				})
				.catch((err) => {
					console.log("err", err);
					
				});
		}
	};

	if (loading) {
		console.log("data", data);
		// console.log("error", error);
		return <CircularProgress color='primary' />;
	}

	return (
		<form>
			{/* {errors && (<p className="text-red-500 text-center">{errors?.message}</p>)} */}
			{customError && (
				<p className='text-red-500 text-center'>{customError?.message}</p>
			)}
			
			<DialogTitle id='form-dialog-title' className='text-center'>
				Register <span className='text-blue-400'>Social</span>
			</DialogTitle>
			{data && (
				<p className='text-green-500 text-center'>{data?.addUser?.msg}</p>
			)}
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
			<DialogContent>
				<TextField
					autoFocus
					margin='dense'
					id='Confirmpassword'
					label='confirm password'
					type='password'
					fullWidth
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
			</DialogContent>
			<DialogActions className='mr-16'>
				<Button variant={"outlined"} color='primary' onClick={submitForm}>
					Submit
				</Button>
			</DialogActions>
		</form>
	);
};

export default Register;
