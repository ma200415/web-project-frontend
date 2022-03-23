import Config from '../config.json'

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
        (error) => { console.log(error) }
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
        (error) => { console.log(error) }
    );
};