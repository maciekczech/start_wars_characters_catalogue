import React from 'react';
import classes from './Character.module.css';

const character = props => {
	return (
		<div className={classes.Character} onClick={props.clicked}>
			<p>
				Name: <strong>{props.name}</strong>
			</p>
			<p>
				Gender: <strong>{props.gender}</strong>
			</p>
			<p>
				Year of Birth <strong>{props.birth}</strong>
			</p>
		</div>
	);
};

export default character;
