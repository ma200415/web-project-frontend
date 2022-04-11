import Config from '../config.json'
import { getAuthToken } from '../helpers/utils'

export const signin = async (data = {}) => {
    return await fetch(`${Config.BASE_URL}/signin`, {
        method: "POST",
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }).then(
        (res) => res.json(),
        (error) => { process.env.NODE_ENV !== "production" && console.log(error) }
    );
};

export const signup = async (data = {}) => {
    return await fetch(`${Config.BASE_URL}/signup`, {
        method: "POST",
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }).then(
        (res) => res.json(),
        (error) => { process.env.NODE_ENV !== "production" && console.log(error) }
    );
};

export const getDecodedAuthToken = async () => {
    return await fetch(`${Config.BASE_URL}/auth`, {
        method: "POST",
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${getAuthToken()}`,
        }
    }).then(
        (res) => res.json(),
        (error) => { process.env.NODE_ENV !== "production" && console.log(error) }
    );
};

export const addDog = async (form) => {
    return await fetch(`${Config.BASE_URL}/dog/add`, {
        method: "POST",
        cache: 'no-cache',
        headers: {
            'authorization': `Bearer ${getAuthToken()}`,
        },
        body: form,
    }).then(
        (res) => res.json(),
        (error) => { process.env.NODE_ENV !== "production" && console.log(error) }
    );
};

export const listDog = async () => {
    return await fetch(`${Config.BASE_URL}/dog/all`, {
        method: "GET",
        cache: 'no-cache',
        headers: {
            'authorization': `Bearer ${getAuthToken()}`,
        },
    }).then(
        (res) => res.json(),
        (error) => { process.env.NODE_ENV !== "production" && console.log(error) }
    );
};