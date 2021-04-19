import React, { Component } from 'react';
import Character from './../../components/Character/Character';
//fetchCharacters action imported from /store/actions/index.js
import { fetchCharacters, expandCharacter } from './../../store/actions/';
import Spinner from './../../components/UI/Spinner/Spinner';

import { connect } from 'react-redux';

export class CharactersList extends Component {
	componentDidMount() {
		this.props.loadCharacters(this.props.quantity);
		console.log(this.props.quantity);
	}

	addOnClickHandler = name => {};

	render() {
		let charactersElement = <Spinner></Spinner>;
		if (this.props.characters) {
			charactersElement = this.props.characters.map(ch => (
				<Character
					clicked={() => this.props.markAsClicked(ch.name)}
					key={ch.name}
					name={ch.name}
					gender={ch.gender}
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
	};
};

const mapDispatchToProps = dispatch => {
	return {
		loadCharacters: quantity => dispatch(fetchCharacters(quantity)),
		markAsClicked: name => dispatch(expandCharacter(name)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList);
