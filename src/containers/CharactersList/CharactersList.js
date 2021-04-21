import React, { Component } from 'react';
import Character from './../../components/Character/Character';
//fetchCharacters action imported from /store/actions/index.js
import {
	fetchCharactersAndFilms,
	expandCharacter,
} from './../../store/actions/';
import Spinner from './../../components/UI/Spinner/Spinner';

import { connect } from 'react-redux';

export class CharactersList extends Component {
	componentDidMount() {
		this.props.loadCharacters(this.props.quantity);
		console.log(this.props.quantity);
	}

	addOnClickHandler = name => {};

	render() {
		let charactersElement = <Spinner />;
		if (!this.props.loading) {
			charactersElement = this.props.characters.map(ch => (
				<Character
					key={ch.name}
					clicked={() => this.props.markAsClicked(ch.name)}
					expanded={ch.expanded}
					height={ch.height}
					name={ch.name}
					gender={ch.gender}
					films={ch.filmTitles}
					birth={ch.birth_year}></Character>
			));
		}
		return <div>{charactersElement}</div>;
	}
}

const mapStateToProps = state => {
	return {
		quantity: state.initialQuantity,
		characters: state.characters,
		loading: state.loading,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		loadCharacters: quantity => dispatch(fetchCharactersAndFilms(quantity)),
		markAsClicked: name => dispatch(expandCharacter(name)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList);
