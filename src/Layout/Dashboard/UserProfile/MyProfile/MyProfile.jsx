import { useEffect, useState } from "react";
import useAuth from "../../../../Hooks/UseAuth/UseAuth";

import useAxiosPublic from "../../../../Hooks/AxiosPublic/axiosPublic";



const MyProfile = () => {
    const { user } = useAuth();
    const [data, setData] = useState([]);
    const axiosPublic = useAxiosPublic();


    useEffect(() => {
        axiosPublic(`/user/${user?.email}`)
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
    }, [])
    return (
        <div className="container mx-auto p-10">
            <div className="w-full max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <img className="object-cover w-full h-56" src={data.image} alt="avatar"/>

                    <div className="py-5 text-center">
                        <a href="#" className="block text-xl font-bold text-gray-800 dark:text-white" tabIndex="0" role="link">Name: {data.name}</a>
                        <span className="text-sm text-gray-700 dark:text-gray-200"> Role: {data.role}</span>
                    </div>
            </div>
        </div>
    );
};

export default MyProfile;