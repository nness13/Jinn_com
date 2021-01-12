import * as axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://j-inn.com/api',
    headers: { 'Content-Type': 'application/json' }
});


export const authAPI = {
    isValidUser(data) {
        return instance.post('user', {user: data}).then( response => {return response.data})
    }

};