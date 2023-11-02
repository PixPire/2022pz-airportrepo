import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3333/';

//create
export const postTicket = (body) => {
    return axios.post("/tickets", body)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}
//read
export const getAllTickets = () => {
    return axios.get("/tickets")
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}
export const getTicketById = (id) => {
    return axios.get("/tickets/"+id)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
}
export const getTicketsByUser = (userId) => {
    return axios.get('/ticketsByUser/'+ userId)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}
export const getTicketsWithFlightInfo = (userId) => {
    return axios.get('/ticketsWithFlightInfo/'+ userId)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}
export const getTicketsByFlight = (flightId) => {
    return axios.get("/tickets", flightId)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}
//update
//remove
export const deleteTicketById = (id) => {
    return axios.delete('/ticketsId/'+ id)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}
export const deleteTicketsByUser = (userId) => {
    return axios.delete("/tickets", userId)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}
export const deleteTicketsByFlight = (flightId) => {
    return axios.delete("/tickets", flightId)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}