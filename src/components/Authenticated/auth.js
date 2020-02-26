
export const isAuthenticated = () => {
    return !!localStorage.getItem('authToken');
}

export const getToken = () => {
    return localStorage.getItem('authToken');
}

export const saveToken = (token) => {
    localStorage.setItem('authToken', token);
} 

export const logOut = () => {
    localStorage.removeItem('authToken');
} 