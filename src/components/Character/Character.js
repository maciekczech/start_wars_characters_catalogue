import React from 'react';
import classes from './Character.module.css';
import Spinner from './../UI/Spinner/Spinner';

const character = props => {
	let characterElement = (
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

	if (props.expanded) {
		let filmListElement = <Spinner></Spinner>;
		if (props.films) {
			filmListElement = (
				<ul>
					{props.films.map(el => (
						<li key={el}>{el}</li>
					))}
				</ul>
			);
		}
		characterElement = (
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
				<p>
					Height <strong>{props.height}</strong>
				</p>
				<div>{filmListElement}</div>
			</div>
		);
	}
	return <>{characterElement}</>;
};

export default character;
