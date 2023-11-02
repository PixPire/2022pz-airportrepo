import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3333/'

export const getDestinations = () => {
    return axios.get('/destinations')
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            return error
        })
}

export const getSearchedFlights = (body) => {
    return axios.post('/searchFlights',body)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            return error
        })
}
export const getSearchedFlightsByDate = (body) => {
    return axios.post('/searchFlightsByDate',body)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            return error
        })
}
export const getSearchedFlightsByDestination = (body) => {
    return axios.post('/searchFlightsByDestination',body)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            return error
        })
}

export const getAllFlights = () => {
    return axios.get('/flight')
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            return error
        })
}

export const getFlightById = (id) => {
    return axios.get('/flight/' + id)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        })
}

export const addFlight = (body) => {
    return axios.post("/flight", body)
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const editFlight = (id, body) => {
    return axios.put("/flight/" + id, body)
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const deleteFlight = (id) => {
    return axios.delete("/flight/" + id)
        .then(response => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const updateSeatsById = (id, body) => {
    return axios.put("/updateSeats/"+ id, body)
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}