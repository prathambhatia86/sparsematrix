import React, { useState } from 'react';
import Sidebar from './Sidebar';
import GetMerchants from './GetMerchants';
import CheckMerchant from './CheckMerchant';

const MainContent = ({ current }) => {
	const select = [<GetMerchants />, <CheckMerchant />]
	return <div className=" d-flex justify-content-center align-content-center mt-5" style={{ width: '85%' }}>
		{select[current]}
	</div>;
};

const SidebarWithData = () => {
	const [current, setCurrent] = useState(0);
	return (
		<div className="container-fluid">
			<div className="row">
				<Sidebar setCurrent={setCurrent} />
				<MainContent current={current} />
			</div>
		</div>
	);
};

export default SidebarWithData;
