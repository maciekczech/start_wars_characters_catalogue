import * as actionTypes from './actionTypes';
import axios from 'axios';

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

export const fetchFilmsStart = () => {
	return {
		type: actionTypes.FETCH_FILMS_START,
	};
};

export const fetchFilmsSuccess = payload => {
	return {
		type: actionTypes.FETCH_FILMS_SUCCESS,
		payload: payload,
	};
};

export const fetchFilmsFailed = payload => {
	return {
		type: actionTypes.FETCH_FILMS_FAILED,
		payload: payload,
	};
};

export const fetchCharacters = quantity => {
	return (dispatch, getState) => {
		dispatch(fetchCharactersStart());
		//getting URL from state
		const URL = getState().nextPage;
		//fetching the first page of the SW API
		return axios
			.get(URL)
			.then(response => {
				console.log(response);
				//dispatch Success action if everything went well
				dispatch(
					fetchCharactersSuccess({
						//passining data about chararters along with next page URL
						characters: response.data.results,
						nextPage: response.data.next,
					}),
				);
			})
			.catch(error => {
				dispatch(fetchCharactersFailed({ error: error }));
			});
	};
};

export const fetchFilms = results => {
	return dispatch => {
		dispatch(fetchFilmsStart());
		//copying results to make sure that I work on a copy
		const resultsCopy = results.slice();
		//creating array of axios.get() Promises for every character 'name'
		const filmsURLArray = resultsCopy.map(result => {
			const { name, films } = result;
			//creating Promise for every film to be fetched
			const axiosGetFilmPromise = films.map(film => axios.get(film));
			//adding name to the array so that later on I'm able to determine who is who and what should go where
			axiosGetFilmPromise.push(name);
			return axiosGetFilmPromise;
		});

		//Upon Promise fulfilment
		//axios.all doesnt work with my setup hence Promise.all is used
		//as long as I am working on the array of the arrays I need to call Promise.all for each array
		Promise.all(filmsURLArray.map(el => Promise.all(el)))
			.then(responses => {
				const updatedCharacters = responses.map(response => {
					//catching index of a single string in the response which happens to be the 'name' that I recently added
					const nameIndex = response.findIndex(
						el => typeof el === 'string' || el instanceof String,
					);
					const name = response[nameIndex];
					//removing the 'name' from the array as I no longer need it
					response.splice(nameIndex, 1);
					//finding a character record relevant to the 'name'
					const updatedCharacterRecord = resultsCopy.find(
						ch => ch.name === name,
					);
					//extract 'filmTitles' from the response and put it in the character record.
					updatedCharacterRecord.filmTitles = response.map(el => {
						return el.data.title;
					});
					return updatedCharacterRecord;
				});
				//dispatch Success action if everything went well
				dispatch(
					fetchFilmsSuccess({
						characters: updatedCharacters,
					}),
				);
			})
			.catch(errors => {
				dispatch(fetchFilmsFailed({ errors: errors }));
			});
	};
};

//https://github.com/reduxjs/redux/issues/1676
export const fetchCharactersAndFilms = quantity => {
	return (dispatch, getState) => {
		return dispatch(fetchCharacters(quantity)).then(() => {
			const tempCharacters = getState().characters;
			return dispatch(fetchFilms(tempCharacters));
		});
	};
};

export const expandCharacterToggle = name => {
	return {
		type: actionTypes.EXPAND_CHARACTER_TOGGLE,
		payload: { name: name },
	};
};

export const expandAll = () => {
	return {
		type: actionTypes.EXPAND_ALL,
	};
};

export const shrinkAll = () => {
	return {
		type: actionTypes.SHRINK_ALL,
	};
};
