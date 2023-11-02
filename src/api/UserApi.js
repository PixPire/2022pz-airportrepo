import axios from 'axios';
import RoleNotifier from '../RoleNotifier';
axios.defaults.baseURL = 'http://localhost:3333/';


export const getUserById = (id) => {
    return axios.get('/user/' + id)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}

export const getUsersByRole = (role) => {
    return axios.get('/user/role/' + role)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
}

export const login= /*async*/ (body)=>{
    return /*await*/ axios.post('/user', body/*, {withCredentials: true}*/)
    .then((response) => {
        RoleNotifier.notify();
        return response;
    })
    .catch((error) => {
        return error;
    });
}
export const logout= (body)=>{
    return axios.post('/logout', body)
    .then((response) => {
        RoleNotifier.notify();
        return response;
    })
    .catch((error) => {
        return error;
    });
}
export const addUser = /*async*/ (body) => {
    return /*await*/ axios.post("/newuser", body/*, {withCredentials: true}*/)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}

export const editUser = (id, body) => {
    return axios.put("/user/" + id, body)
        .then((response) => {
            console.log(response)
            return response;
        })
        .catch((error) => {
            return error;
        });
}

export const deleteUser = (id) => {
    return axios.delete("/user/" + id)
        .then(response => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}