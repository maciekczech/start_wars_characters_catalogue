import * as actionTypes from './../actions/actionTypes';
import { updateObject } from './../../shared/utility';

const initialState = {
	initialQuantity: 10,
	characters: [],
	loading: false,
	loadingMore: false,
	error: null,
	nextPage: 'http://swapi.dev/api/people/?page=1',
};

const fetchCharactersStart = (state, payload) => {
	//if characters array is empty I want to set my 'loading' value to true
	//if characters array is NOT empty I want to set my 'loadingMore' value to true
	const loadingValue = state.characters.length === 0;
	return updateObject(state, {
		error: payload,
		loading: loadingValue,
		loadingMore: !loadingValue,
	});
};

const fetchCharactersSuccess = (state, payload) => {
	const updatedCharacters = state.characters.concat(payload.characters);
	//if characters array is empty I want to set my 'loading' value to true
	//if characters array is NOT empty I want to set my 'loadingMore' value to true
	const loadingValue = state.characters.length === 0;
	return updateObject(state, {
		characters: updatedCharacters,
		nextPage: payload.nextPage,
		loadingMore: false,
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
			return fetchCharactersStart(state, payload);

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
