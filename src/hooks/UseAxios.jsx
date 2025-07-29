import axios from 'axios';
import React from 'react';

const axiosInstance = axios.create({
    baseURL: 'https://fitness-tracker-server-red.vercel.app'
})

const UseAxios = () => {
    return axiosInstance
};

export default UseAxios;