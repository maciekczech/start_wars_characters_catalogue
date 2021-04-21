import React from 'react';
import classes from './Character.module.css';
import Spinner from './../UI/Spinner/Spinner';
import { FaIdBadge } from 'react-icons/fa';

const character = props => {
	let characterClasses = [classes.CharacterDefault];
	let characterElement = (
		<div className={characterClasses.join(' ')} onClick={props.clicked}>
			<div className={classes.NameContainer}>
				<div className={classes.Name}>
					<FaIdBadge className={classes.Logo} />
					<p>
						<strong>{props.name}</strong>
					</p>
				</div>
			</div>
			<div className={classes.RestContainer}>
				<div className={classes.Gender}>
					{' '}
					<p>
						Gender: <strong>{props.gender}</strong>
					</p>
					<div className={classes.Born}>
						{' '}
						<p>
							Born: <strong>{props.birth}</strong>
						</p>
					</div>
				</div>
			</div>
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
		characterClasses.push(classes.CharacterExpanded);
		characterElement = (
			<div className={characterClasses.join(' ')} onClick={props.clicked}>
				<div className={classes.NameContainer}>
					<div className={classes.Name}>
						<FaIdBadge className={classes.Logo} />
						<p>
							<strong>{props.name}</strong>
						</p>
					</div>
				</div>
				<div className={classes.RestContainer}>
					<div className={classes.Gender}>
						{' '}
						<p>
							Gender: <strong>{props.gender}</strong>
						</p>
						<div className={classes.Born}>
							{' '}
							<p>
								Born: <strong>{props.birth}</strong>
							</p>
						</div>
						<div className={classes.Height}>
							{' '}
							<p>
								Height: <strong>{props.height}</strong>
							</p>
						</div>
					</div>
				</div>
				<div className={classes.FilmsContainer}>
					<div className={classes.Films}>{filmListElement}</div>
				</div>
			</div>
		);
	}
	return <>{characterElement}</>;
};

export default character;
