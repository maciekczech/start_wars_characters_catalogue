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

const expandCharacter = (state, payload) => {
	const indexOfElementToBeExpanded = state.characters.find(
		el => el.name === payload.name,
	);
	console.log(indexOfElementToBeExpanded);
	return { ...state };
	//dodaj do tego elementy specjalne pole na podstawie którego będziesz zmieniał właściwości na końcu drzewa componentów
};

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case actionTypes.FETCH_CHARACTERS_START:
			return updateObject(state, { loading: true });

		case actionTypes.FETCH_CHARACTERS_SUCCESS:
			return fetchCharactersSuccess(state, payload);

		case actionTypes.FETCH_CHARACTERS_FAILED:
			return fetchCharactersFailed(state, payload);

		case actionTypes.EXPAND_CHARACTER:
			return expandCharacter(state, payload);

		default:
			return state;
	}
};

export default reducer;
