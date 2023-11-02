import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3333/';

export const postArticle = (data) => {
    return axios.post('/articles', data, {
        headers: { 
            'Authorization': 'Basic xxxxxxxxxxxxxxxxxxx',
            'Content-Type' : 'raw'
            //'Content-Type' : 'multipart/form-data'
        }
    })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
}

export const getArticleThumbs = () => {
    return axios.get('/articles'/*, {headers: {'Content-Type' : 'raw'}}*/)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
}

export const getArticleThumbsViaFetch = () => {
    return fetch('/articles', {method: 'GET'})
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not OK');
                console.log("Response error");
              }
            return response.TypedArray();
        })
        .catch((error) => {
            return error;
        });
}

export const getArticleThumbsWithFormData = () => {
    return axios.get('/articles'/*, {headers: {'Content-Type' : 'raw'}}*/)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
}

export const getArticleBody = (id) => {
    return axios.get('/articles/' + id /*,{responseType: 'arrayBuffer'}*/)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
}