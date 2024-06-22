import { useEffect, useState } from "react";
import useAxiosPublic from "../../../../Hooks/AxiosPublic/axiosPublic";
import useAuth from "../../../../Hooks/UseAuth/UseAuth";
import PropertyBrougtCard from "./PropertyBrougtCard";


const PropertyBought = () => {
    const { user } = useAuth();
    const [data, setData] = useState([]);
    const axiosPublic = useAxiosPublic();


    useEffect(() => {
        axiosPublic(`/user/offer/${user?.email}`)
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
    }, [])
    return (
        <div>
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            
        {
            data.map(card=> <PropertyBrougtCard key={card._id} card={card} />)
        }
            </div>
        </div>
    );
};

export default PropertyBought;