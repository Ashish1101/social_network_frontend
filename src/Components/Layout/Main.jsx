import React from "react";
import Image from "../../svgs/Notifications_Monochromatic.svg";

const Main = () => {
	return (
		<div className='w-max-full'>
			<div>
				<div className='flex justify-around items-center space-y-16'>
					<div className='space-y-2'>
						<h1 className='text-xl font-semibold md:text-3xl'>
							Bored Sitting Alone
						</h1>
						<p className='text-sm md:text-lg'>
							Don't worry we are here to help you
						</p>
					</div>
					<div>
						<img src={Image} alt='boyImage' height='200' width='200' />
					</div>
				</div>
				<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
					<path
						// fill={`${localStorage.getItem('theme') === 'dark'} ? 'black' : 'green' `}
						fill="#0099ff"
						fillOpacity='0.9'
						d='M0,288L24,272C48,256,96,224,144,197.3C192,171,240,149,288,165.3C336,181,384,235,432,240C480,245,528,203,576,176C624,149,672,139,720,154.7C768,171,816,213,864,202.7C912,192,960,128,1008,122.7C1056,117,1104,171,1152,176C1200,181,1248,139,1296,112C1344,85,1392,75,1416,69.3L1440,64L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z'
					></path>
				</svg>
			</div>
		</div>
	);
};

export default Main;
