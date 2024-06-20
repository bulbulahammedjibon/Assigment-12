import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/UseAuth/UseAuth";
import axios from "axios";
import useAxiosPublic from "../../../Hooks/AxiosPublic/axiosPublic";
import WishListCard from "./MyProfile/WishListCard";


const WishList = () => {
    const { user, loader } = useAuth();
    if (loader) {
        return <h3>Loading...</h3>
    }
    const axiosPublic = useAxiosPublic();
    const [wlist, setWlist] = useState([]);
    useEffect(() => {
        axiosPublic.get(`/wishlist/${user?.email}`)
            .then(res => {
                console.log(res.data);
                setWlist(res.data);

            })
    }, [user])


    return (
        <div className="mx-5">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {
                wlist.map(list => <WishListCard list={list} key={list._id}/> )
            }
            </div>



        </div>
    );
};

export default WishList;