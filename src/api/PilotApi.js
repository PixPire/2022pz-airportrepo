import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3333/';

export const getAwariaId = (id) => {
    return axios.get('/awaria/' + id)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}
export const getAwarie = () => {
    return axios.get('/awarie')
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
}
export const getOpoznienia = ()=>{
    return axios.get('/opoznienia')
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
}
export const addAwaria = (body) => {
    return axios.post("/awaria", body)
        .then((response) => {
            console.log(1);
            return response;
        })
        .catch((error) => {
            console.log(2);
            return error;
        });
}
export const deleteAwariaId = (id) => {
    return axios.delete("/awaria/"+id)
        .then(response => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}
export const getOpoznienieId = (id) => {
    return axios.get('/opoznienie/' + id)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}

export const addOpoznienie = (body) => 
{
    return axios.post("/opoznienie", body)
        .then((response) => {
            console.log(1);
            return response;
        })
        .catch((error) => {
            console.log(2);
            return error;
        });
}
export const editOpoznienieId = (id,body) => 
{
    return axios.put("/opoznienie/"+id,body)
        .then((response) => {
            console.log(1);
            return response;
        })
        .catch((error) => {
            console.log(2);
            return error;
        });
}

export const editAwariaId = (id, body) => {
    return axios.put("/awaria/" + id, body)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}

export const deleteOpoznienieId = (id) => {
    return axios.delete("/opoznienie/"+id)
        .then(response => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}
export const getPiloci = ()=>{
    return axios.get('/piloci')
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
}

export const addPilot = (body) => 
{
    return axios.post("/pilot", body)
        .then((response) => {
            console.log(1);
            return response;
        })
        .catch((error) => {
            console.log(2);
            return error;
        });
}