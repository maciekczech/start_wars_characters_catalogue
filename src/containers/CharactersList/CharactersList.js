import React, { Component } from 'react';
import Character from './../../components/Character/Character';
//fetchCharacters action imported from /store/actions/index.js
import {
	fetchCharactersAndFilms,
	expandCharacter,
} from './../../store/actions/';
import Spinner from './../../components/UI/Spinner/Spinner';
import classes from './CharactersList.module.css';

import { connect } from 'react-redux';

export class CharactersList extends Component {
	state = {
		//using state to keep track of current number of elements to be displayed
		//setting it to initial quantity value from store at first
		currentQuantity: this.props.quantity,
		//number of elements to be added per single Add button click
		step: 5,
	};

	componentDidMount() {
		this.props.loadCharacters(this.props.quantity);
		console.log(this.props.quantity);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.currentQuantity !== this.state.currentQuantity) {
			console.log(
				`length of array ${this.props.characters.length} currentQuantity ${this.state.currentQuantity}`,
			);
			if (this.props.characters.length < this.state.currentQuantity) {
				this.props.loadCharacters(this.props.quantity);
			}
		}
	}

	loadMoreItems = () => {
		//increment the current Quantity by a step value
		//using callback to make sure that Im working on the latest state
		//as long as this is async state call, I'll react to that change in componentDidUpdate()
		this.setState(state => {
			return { currentQuantity: (state.currentQuantity += state.step) };
		});
	};

	render() {
		let charactersElement = <Spinner />;
		let loadMoreSpinner = null;
		if (this.props.loadingMore) {
			loadMoreSpinner = <Spinner />;
		}
		if (!this.props.loading) {
			charactersElement = this.props.characters.map((ch, index) => {
				if (index < this.state.currentQuantity) {
					return (
						<Character
							key={index}
							clicked={() => this.props.markAsClicked(ch.name)}
							expanded={ch.expanded}
							height={ch.height}
							name={ch.name}
							gender={ch.gender}
							films={ch.filmTitles}
							birth={ch.birth_year}></Character>
					);
				}
			});
		}
		return (
			<>
				<div className={classes.CharacterList}>{charactersElement}</div>{' '}
				<div className={classes.ButtonContainer}>
					<button
						className={classes.Button}
						onClick={this.loadMoreItems}
						type="button">
						Load More
					</button>
				</div>
				<div>{loadMoreSpinner}</div>{' '}
			</>
		);
	}
}

const mapStateToProps = state => {
	return {
		quantity: state.initialQuantity,
		characters: state.characters,
		loading: state.loading,
		loadingMore: state.loadingMore,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		loadCharacters: quantity => dispatch(fetchCharactersAndFilms(quantity)),
		markAsClicked: name => dispatch(expandCharacter(name)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList);
