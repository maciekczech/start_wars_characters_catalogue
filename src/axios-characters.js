import axios from 'axios';

//default axios intance that includes base URL for all characters-related requests
const instance = axios.create({
	baseURL: 'https://swapi.dev/api/people',
});

export default instance;
