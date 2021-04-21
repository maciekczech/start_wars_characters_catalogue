import { React, useState, useEffect } from 'react';
import classes from './Character.module.css';
import Spinner from './../UI/Spinner/Spinner';
import { FaIdBadge } from 'react-icons/fa';

const Character = props => {
	const [animationTimeCounter, setanimationTimeCounter] = useState(false);

	useEffect(() => {
		setanimationTimeCounter(false);
	}, [props.expanded]);

	let characterClasses = [classes.CharacterDefault];
	let characterElement = (
		<div className={characterClasses.join(' ')} onClick={props.clicked}>
			<div className={classes.LeftCharacterSection}>
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
		</div>
	);

	if (props.expanded) {
		let filmListElement = (
			<div className={classes.FilmsContainer}>
				<Spinner />
			</div>
		);
		setTimeout(() => {
			setanimationTimeCounter(true);
		}, 300);
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
				<div className={classes.LeftCharacterSection}>
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
				</div>
				{animationTimeCounter ? (
					<div className={classes.FilmsContainer}>
						<div className={classes.Films}>{filmListElement}</div>
					</div>
				) : null}
			</div>
		);
	}
	return <>{characterElement}</>;
};

export default Character;
