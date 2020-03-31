import React, {useState} from 'react';
import {MenuOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import {Carousel} from 'antd';

const Header = () => {
	function onChange(a, b, c) {
		console.log(a, b, c);
	}
	return (
		<div>
			<Carousel afterChange={onChange} className="bg-red-500 100vh">
				<div>
					<h3>First Project</h3>
				</div>
				<div>
					<h3>2</h3>
				</div>
				<div>
					<h3>3</h3>
				</div>
				<div>
					<h3>4</h3>
				</div>
			</Carousel>
			,
		</div>
	);
};

export default Header;
