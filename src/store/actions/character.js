import * as actionTypes from './actionTypes';
import axios from './../../axios-characters';

export const fetchCharactersStart = () => {
	return {
		type: actionTypes.FETCH_CHARACTERS_START,
	};
};

export const fetchCharactersSuccess = payload => {
	return {
		type: actionTypes.FETCH_CHARACTERS_SUCCESS,
		payload: payload,
	};
};

export const fetchCharactersFailed = payload => {
	return {
		type: actionTypes.FETCH_CHARACTERS_FAILED,
		payload: payload,
	};
};

export const fetchCharacters = quantity => {
	return dispatch => {
		dispatch(fetchCharactersStart());
		axios
			.get('/?page=1')
			.then(response => {
				console.log(response.data.results);
				dispatch(
					fetchCharactersSuccess({
						characters: response.data.results,
					}),
				);
			})
			.catch(error => {
				dispatch(fetchCharactersFailed({ error: error.response }));
			});
	};
};

export const expandCharacter = name => {
	return {
		type: actionTypes.EXPAND_CHARACTER,
		payload: { name: name },
	};
};
