import { useEffect, useState } from "react";
import useAuth from "../../../../../Hooks/UseAuth/UseAuth";
import useAxiosPublic from "../../../../../Hooks/AxiosPublic/axiosPublic";



const MySoldProperty = () => {
    const { user } = useAuth();
    const [data, setData] = useState([]);
    const axiosPublic = useAxiosPublic();


    useEffect(() => {
        axiosPublic(`/agent-sold/${user?.email}`)
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
    }, [])


    return (
        <div>
            

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Property Title</th>
                            <th>Property Location</th>
                            <th>buyer Email</th>
                            <th>buyer Name</th>
                            <th>Sold</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            data.map((data ,index) =>  <tr key={data._id}>
                            <th>{index +1}</th>
                            <td>{data.title}</td>
                            <td>{data.location}</td>
                            <td>{data.user_email}</td>
                            <td>{data.user_name}</td>
                            <td>$ {data.offer_amount}</td>
                        </tr>)
                        }
                        {/* row 1 */}
                       

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MySoldProperty;