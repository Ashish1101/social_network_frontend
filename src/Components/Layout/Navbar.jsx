import React, { useState  , useContext , useEffect} from "react";
import { Button, Switch, Dialog } from "@material-ui/core";
import Register from "../Screen/Register";
import Login from "../Screen/Login";
import Drawer from "./Drawer";
import {ThemeContext} from '../../Context/ThemeContext'
import { useHistory } from "react-router-dom";
const Navbar = () => {
	const [value, setValue] = useState(false);
	const [open, setOpen] = useState(false);
	const [open1, setOpen1] = useState(false);
    const token = localStorage.getItem('token')
	let history = useHistory()
	useEffect(() => {
		if(!token) {
			history.push('/')
		}
	}, [])

	const { theme, setTheme } = useContext(ThemeContext)

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClickOpen1 = () => {
		setOpen1(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleClose1 = () => {
		setOpen1(false);
	};

	const isDark = () => {
		return theme === "dark"
	};

	// const token = localStorage.getItem("token");

	return (
		<div className='container max-w-full h-12 shadow-xl bg-white dark:bg-gray-900 flex md:justify-around items-center justify-between'>
			<div>
				<h3 className='text-blue-500'>Free Time</h3>
			</div>
			<div className='space-x-4'>
				<div className="hidden md:block">
					{token === null || token === undefined || token === "" ? (
						<>
							<Button color='primary' onClick={handleClickOpen}>
								Register
							</Button>
							<Button color='primary' onClick={handleClickOpen1}>
								Login
							</Button>
						</>
					) : (
						<Button color='primary' onClick={() => {localStorage.removeItem('token')}} >Logout</Button>
					)}
					<Switch
						checked={isDark()}
						onChange={e => setTheme(e.target.checked ? "dark" : "light")}
						name='checkedA'
						inputProps={{ "aria-label": "secondary checkbox" }}
					/>
				</div>
				<div className="block md:hidden">
					<Drawer />
				</div>
			</div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='form-dialog-title'
			>
				<Register />
			</Dialog>
			<Dialog
				open={open1}
				onClose={handleClose1}
				aria-labelledby='form-dialog-title'
			>
				<Login />
			</Dialog>
		</div>
	);
};

export default Navbar;
