
import { useEffect } from "react";
import { useState } from "react";
import AdvertisemntCard from "./AdvertisementCard/AdvertisemntCard";
import useAxiosPublic from "../../Hooks/AxiosPublic/axiosPublic";



const Advertisement = () => {
    const axiosPublic = useAxiosPublic();
    const [cardData, setCardData] = useState([]);
    useEffect(() => {
        axiosPublic('/property-advertisement')
            .then(res => {
                console.log(res.data),
                    setCardData(res.data);
            })
    }, [])


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {
                cardData.map(card => <AdvertisemntCard key={card._id} card={card} />)
            }
        </div>
    );
};

export default Advertisement;