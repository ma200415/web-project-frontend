const AUTHTOKEN_NAME = "authToken";

export const setAuthToken = (authToken) => {
    localStorage.setItem(AUTHTOKEN_NAME, authToken);
};

export const getAuthToken = () => {
    return localStorage.getItem(AUTHTOKEN_NAME);
};

export const getUserName = (firstName, lastName) => {
    return firstName + " " + lastName
}

export const getDogAge = (date) => {
    return new Date().getFullYear() - new Date(date).getFullYear()
}

export const getGender = (gender) => {
    switch (gender) {
        case "m":
            return "Male"
        case "f":
            return "Female"
        default:
            return gender
    }
}

export const dateToString = (date) => {
    return (date && new Date(date).toLocaleString())
}

export const minMaxDateFormat = (date) => {
    return date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, "0") + "-" + date.getDate().toString().padStart(2, "0")
}