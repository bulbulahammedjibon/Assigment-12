import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AllPropertyCard from "./AllPropertyCard";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosPublic from "../../Hooks/AxiosPublic/axiosPublic";



const AllProperty = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    console.log(user);
    const [allData, setData] = useState([]);

    useEffect(() => {
        axiosPublic('/property-advertisement')
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
    }, [])

    return (
        <div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {
                    allData.map(card => <AllPropertyCard key={card._id} card={card} />)
                }
            </div>
        </div>
    );
};

export default AllProperty;