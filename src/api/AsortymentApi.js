import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3333/';

export const getAsortyment = () => {
    return axios.get('/asortyment')
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
}

export const getAsortymentId = (id) => {
    return axios.get('/asortyment/' + id)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
}


export const postAsortyment = (body) => {
    return axios.post("/asortyment", body)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        })
}

export const putAsortymentId = (id, body) => {
    return axios.put("/asortyment/" + id, body)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}

export const deleteAsortymentId = (id) => {
    return axios.delete("/asortyment/" + id)
        .then(response => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}