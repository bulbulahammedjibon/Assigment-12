import { useEffect, useState } from "react";
import useAuth from "../../../../../Hooks/UseAuth/UseAuth";
import useAxiosPublic from "../../../../../Hooks/AxiosPublic/axiosPublic";



const RequestedProperties = () => {
    const { user } = useAuth();
    const [data, setData] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        propertyData()
    }, [])


    const propertyData = () => axiosPublic(`/requsted-property/${user?.email}`)
        .then(res => {
            console.log(res.data);
            setData(res.data);
        })


    const handleAccept = (_id, id, user_email) => {
        const status = {
            status_accepted: 'accepted',
            status_reject: 'rejected',
            _id: _id,
            id: id,
            email: user_email,

        };
        axiosPublic.patch(`/update-accept/${id}`, status)
            .then(res => {
                console.log(res.data);
                propertyData();
            })
        // console.log(id,_id)
    }

    const handleReject = (_id, id,user_email) => {
        const status = {
            status: 'rejected',
            _id: _id,
            id: id,
            email:user_email,

        };
        axiosPublic.patch(`/update-reject/${id}`, status)
            .then(res => {
                console.log(res.data);
                propertyData();
            })
        // console.log(id,_id)
    }





    return (
        <div className="container mx-auto">
           

            {/*
  Heads up! 👋

  This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
*/}

            <div className="overflow-x-auto mx-5">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Location</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Buyer Name</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Buyer Email</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Price</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Status</th>
                            <th className="px-4 py-2"></th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {
                            data.map(data => <tr key={data._id}>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"> {data.title}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{data.location}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{data.user_name}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{data.user_email}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{data.offer_amount}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{data.status}</td>
                                <td className="whitespace-nowrap px-4 py-2">
                                    <button
                                        disabled={status}
                                        onClick={() => handleAccept(data._id, data.id, data.user_email)}
                                        // className={`btn btn-sm text-white  bg-green-500  `}
                                        className={` btn btn-sm && ${data.status === 'pending' ? 'btn-success' : 'btn-disabled'
                                            }`}
                                    >
                                        Accept
                                    </button>
                                </td>

                                <td className="whitespace-nowrap px-4 py-2">
                                    <button
                                        onClick={() => handleReject(data._id, data.id,data.user_email)}
                                        className={` btn btn-sm && ${data.status === 'pending' ? 'btn-error' : 'btn-disabled'
                                            }`}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>)


                        }




                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestedProperties;