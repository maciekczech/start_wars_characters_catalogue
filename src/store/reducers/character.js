import * as actionTypes from './../actions/actionTypes';
import { updateObject } from './../../shared/utility';

const initialState = {
	initialQuantity: 10,
	characters: [],
	loading: false,
	error: null,
};

const fetchCharactersSuccess = (state, payload) => {
	return updateObject(state, {
		characters: payload.characters,
		loading: false,
	});
};

const fetchCharactersFailed = (state, payload) => {
	return updateObject(state, { error: payload, loading: false });
};

const fetchFilmsSuccess = (state, payload) => {
	return updateObject(state, {
		characters: payload.characters,
		loading: false,
	});
};

const fetchFilmsFailed = (state, payload) => {
	return updateObject(state, { error: payload, loading: false });
};

const expandCharacter = (state, payload) => {
	const indexOfElementToBeExpanded = state.characters.findIndex(
		el => el.name === payload.name,
	);
	//copying characters from state to make sure to not mutate the state accidentally
	const tempCharacters = state.characters.slice();
	//checking whether custom 'expanded' field has already been added (or has a false value) to subjected Character
	if (tempCharacters[indexOfElementToBeExpanded].expanded) {
		//toggling value back to false
		tempCharacters[indexOfElementToBeExpanded].expanded = false;
	} else {
		//adding new 'expanded' field to the clicked element of the array or toggling it to true
		tempCharacters[indexOfElementToBeExpanded].expanded = true;
	}
	return updateObject(state, { characters: tempCharacters });
};

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case actionTypes.FETCH_CHARACTERS_START:
			return updateObject(state, { loading: true });

		case actionTypes.FETCH_CHARACTERS_SUCCESS:
			return fetchCharactersSuccess(state, payload);

		case actionTypes.FETCH_CHARACTERS_FAILED:
			return fetchCharactersFailed(state, payload);

		case actionTypes.FETCH_FILMS_START:
			return { ...state };

		case actionTypes.FETCH_FILMS_SUCCESS:
			return fetchFilmsSuccess(state, payload);

		case actionTypes.FETCH_FILMS_FAILED:
			return fetchFilmsFailed(state, payload);

		case actionTypes.EXPAND_CHARACTER:
			return expandCharacter(state, payload);

		default:
			return state;
	}
};

export default reducer;
