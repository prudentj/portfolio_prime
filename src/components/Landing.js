import React, {useState} from 'react';
import {MenuOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import {Carousel} from 'antd';
import Zebra from './img/zebra.jpg';

const divclass = 'container flex justify-center items-center bg-white';
const imgclass = 'object-contain max-h-screen';

const Header = () => {
	function onChange(a, b, c) {
		console.log(a, b, c);
	}
	return (
		<div>
			<Carousel afterChange={onChange}>
				<div className={divclass}>
					<img src={Zebra} alt="Zebra in black" className={imgclass} />
				</div>
				<div className={divclass}>
					<img src={Zebra} alt="Zebra in black" className={imgclass} />
				</div>
				<div className={divclass}>
					<img src={Zebra} alt="Zebra in black" className={imgclass} />
				</div>
				<div className={divclass}>
					<img
						src={Zebra}
						alt="Zebra in black"
						className={'h-auto w-auto max-h-screen'}
					/>
				</div>
			</Carousel>
		</div>
	);
};

export default Header;
