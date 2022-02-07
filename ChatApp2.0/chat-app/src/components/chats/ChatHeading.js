import React from 'react';
import FAVideo from 'react-icons/fa/index.js'
import FAUserPlus from 'react-icons/fa/index.js'
import MdEllipsisMenu from 'react-icons/md/index.js'

export default function({name, numberOfUsers}) {
	
	return (
		<div className="chat-header">
			<div className="user-info">
				<div className="user-name">{name}</div>
				<div className="status">
					<div className="indicator"></div>
					<span>{numberOfUsers ? numberOfUsers : null}</span>
				</div>
			</div>
			<div className="options">
				<FAVideo />
				<FAUserPlus />
				<MdEllipsisMenu />
			</div>
		</div>
	);
	
}