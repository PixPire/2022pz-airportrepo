import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3333/';

export const getHarmonogramId = (id_pilota) => {
    return axios.get('/harmonogram/' + id_pilota)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}