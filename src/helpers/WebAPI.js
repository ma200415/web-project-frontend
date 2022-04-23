import Config from '../config.json'
import { getAuthToken } from '../helpers/utils'

export const signin = async (data = {}) => {
    return await fetch(`${Config.BASE_URL}/signin`, {
        method: "POST",
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
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
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(
        (res) => res.json(),
        (error) => { process.env.NODE_ENV !== "production" && console.log(error) }
    );
};

export const queryUser = async (data = {}) => {
    return await fetch(`${Config.BASE_URL}/user/id`, {
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

export const queryDog = async (data = {}) => {
    return await fetch(`${Config.BASE_URL}/dog/id`, {
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

export const queryMessage = async (data = {}) => {
    return await fetch(`${Config.BASE_URL}/message/id`, {
        method: "POST",
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${getAuthToken()}`,
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

export const editDog = async (form) => {
    return await fetch(`${Config.BASE_URL}/dog/edit`, {
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

export const listDog = async (data = {}) => {
    return await fetch(`${Config.BASE_URL}/dog`, {
        method: "POST",
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(data),
    }).then(
        (res) => res.json(),
        (error) => { process.env.NODE_ENV !== "production" && console.log(error) }
    );
};

export const deleteDog = async (id = "") => {
    return await fetch(`${Config.BASE_URL}/dog/delete`, {
        method: "POST",
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify({ dogId: id }),
    }).then(
        (res) => res.json(),
        (error) => { process.env.NODE_ENV !== "production" && console.log(error) }
    );
};

export const bookmarkDog = async (id = "") => {
    return await fetch(`${Config.BASE_URL}/user/bookmark`, {
        method: "POST",
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify({ dogId: id }),
    }).then(
        (res) => res.json(),
        (error) => { process.env.NODE_ENV !== "production" && console.log(error) }
    );
};

export const unbookmarkDog = async (id = "") => {
    return await fetch(`${Config.BASE_URL}/user/unbookmark`, {
        method: "POST",
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify({ dogId: id }),
    }).then(
        (res) => res.json(),
        (error) => { process.env.NODE_ENV !== "production" && console.log(error) }
    );
};

export const newBooking = async (data = {}) => {
    return await fetch(`${Config.BASE_URL}/booking/new`, {
        method: "POST",
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(data),
    }).then(
        (res) => res.json(),
        (error) => { process.env.NODE_ENV !== "production" && console.log(error) }
    );
};

export const listBooking = async () => {
    return await fetch(`${Config.BASE_URL}/booking`, {
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

export const bookedDog = async (data = {}) => {
    return await fetch(`${Config.BASE_URL}/booking/booked`, {
        method: "POST",
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(data),
    }).then(
        (res) => res.json(),
        (error) => { process.env.NODE_ENV !== "production" && console.log(error) }
    );
};

export const sendMessage = async (data = {}) => {
    return await fetch(`${Config.BASE_URL}/message/add`, {
        method: "POST",
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(data),
    }).then(
        (res) => res.json(),
        (error) => { process.env.NODE_ENV !== "production" && console.log(error) }
    );
};

export const listMessage = async () => {
    return await fetch(`${Config.BASE_URL}/message`, {
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

export const appendMessage = async (data = {}) => {
    return await fetch(`${Config.BASE_URL}/message/append`, {
        method: "POST",
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(data),
    }).then(
        (res) => res.json(),
        (error) => { process.env.NODE_ENV !== "production" && console.log(error) }
    );
};