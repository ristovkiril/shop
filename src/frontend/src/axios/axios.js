import axios from 'axios';

export const HttpClient = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
});
