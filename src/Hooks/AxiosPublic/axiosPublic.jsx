import axios from "axios";

const axiosPublic = axios.create({
    // baseURL: 'http://localhost:7000',
    baseURL: 'https://server-real-state.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;