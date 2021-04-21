import React, { Component } from 'react';
import Character from './../../components/Character/Character';
//fetchCharacters action imported from /store/actions/index.js
import {
	fetchCharactersAndFilms,
	expandCharacterToggle,
	expandAll,
	shrinkAll,
} from './../../store/actions/';
import Spinner from './../../components/UI/Spinner/Spinner';
import classes from './CharactersList.module.css';

import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import axios from 'axios';

import InfiniteScroll from 'react-infinite-scroll-component';

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

	loadMoreItems = () => {
		//first check whether characters array includes less elements that required to display 5 more
		//I fetch 10 items per each request hence every other button click we will not need to fetch data, instead we only display what's inside the array
		if (
			this.props.characters.length <
			this.state.currentQuantity + this.state.step
		) {
			this.props.loadCharacters(this.props.quantity);
		}
		//then increment the current Quantity by a step value
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
				} else {
					return null;
				}
			});
		}
		return (
			<>
				<div className={classes.ButtonContainer}>
					<button
						className={[classes.Button, classes.NavButtons].join(
							' ',
						)}
						onClick={this.props.expandAll}
						type="button">
						Expand All
					</button>
					<button
						className={[classes.Button, classes.NavButtons].join(
							' ',
						)}
						onClick={this.props.shrinkAll}
						type="button">
						Shrink All
					</button>
				</div>
				<div className={classes.CharacterList}>{charactersElement}</div>
				{/* had some issue with the Infinite scroll so I left it commented out and sticked with good old Button */}
				{/* 				<InfiniteScroll
					dataLength={this.state.currentQuantity}
					next={() => this.props.loadCharacters(this.props.quantity)}
					hasMore={true}
					loader={<Spinner />}>
					<div className={classes.CharacterList}>
						{this.props.characters.map((ch, index) => {
							//if (index < this.state.currentQuantity) {
							return (
								<Character
									key={index}
									clicked={() =>
										this.props.markAsClicked(ch.name)
									}
									expanded={ch.expanded}
									height={ch.height}
									name={ch.name}
									gender={ch.gender}
									films={ch.filmTitles}
									birth={ch.birth_year}></Character>
							);
							//}
						})}
					</div>
				</InfiniteScroll> */}
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
		markAsClicked: name => dispatch(expandCharacterToggle(name)),
		expandAll: () => dispatch(expandAll()),
		shrinkAll: () => dispatch(shrinkAll()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withErrorHandler(CharactersList, axios));
