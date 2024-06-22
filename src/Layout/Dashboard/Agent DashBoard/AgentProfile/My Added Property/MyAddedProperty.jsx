import { useEffect, useState } from "react";
import useAuth from "../../../../../Hooks/UseAuth/UseAuth";
import useAxiosPublic from "../../../../../Hooks/AxiosPublic/axiosPublic";
import MyAddPropertyCard from "./MyAddPropertyCard";



const MyAddedProperty = () => {
    const { user } = useAuth();
    const [propertyData, setPropertyData] = useState([]);
    const axiosPublic = useAxiosPublic();
    useEffect(() => {
        axiosPublic(`/property/${user?.email}`)
            .then(res => {
                console.log(res.data);
                setPropertyData(res.data);

            })
    }, [])
    useEffect(() => {

    }, [])

    return (
        <div>
            
           
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" >
                {
                    propertyData.map(data => <MyAddPropertyCard key={data._id} data={data} />)
                }
            </div>
        </div>
    );
};

export default MyAddedProperty;