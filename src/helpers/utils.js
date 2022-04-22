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

export const hkIsland = {
    district: "HONG KONG ISLAND",
    centres: [
        "Hong Kong Centre"
    ]
}

export const kowloon = {
    district: "KOWLOON",
    centres: [
        "Kowloon Centre",
        "Mongkok Centre"
    ]
}

export const newTerritories = {
    district: "NEW TERRITORIES AND OUTLYING ISLANDS",
    centres: [
        "Sai Kung Centre",
        "Hang Hau Centre",
        "Mui Wo Centre"
    ]
}

export const stringToColor = (string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

export const stringAvatar = (orgName) => {
    const nameSplit = orgName.split(' ')

    var name = nameSplit[0][0]

    if (nameSplit.length > 1) {
        name += nameSplit[1][0]
    }

    return {
        sx: {
            bgcolor: stringToColor(orgName),
        },
        children: name,
    };
}