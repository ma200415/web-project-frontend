const AUTHTOKEN_NAME = "authToken";

export const setAuthToken = (authToken) => {
    localStorage.setItem(AUTHTOKEN_NAME, authToken);
};

export const getAuthToken = () => {
    return localStorage.getItem(AUTHTOKEN_NAME);
};
