import { useEffect, useState } from "react";
import useAuth from "../../../../../Hooks/UseAuth/UseAuth";
import useAxiosPublic from "../../../../../Hooks/AxiosPublic/axiosPublic";



const RequestedProperties = () => {
    const { user } = useAuth();
    const [data, setData] = useState([]);
    const axiosPublic = useAxiosPublic();


    const handleAccept = (_id, id,user_email) => {
        const status = {
            status: 'accepted',
            // status_r:'rejected',
            _id: _id,
            id: id,
            // user_email: user_email,

        };
        axiosPublic.patch(`/update-accept/${id}`, status)
            .then(res => {
                console.log(res.data);
            })
        // console.log(id,_id)
    }

    const handleReject = (_id, id) => {
        const status = {
            status: 'rejected',
            _id: _id,
            id: id,

        };
        axiosPublic.patch(`/update-reject/${id}`, status)
            .then(res => {
                console.log(res.data);
            })
        // console.log(id,_id)
    }




    useEffect(() => {
        axiosPublic(`/requsted-property/${user?.email}`)
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
    }, [])
    return (
        <div className="container mx-auto">
            <h4>Requested Property</h4>

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
                                        onClick={() => handleAccept(data._id, data.id,user_email)}
                                        className="inline-block rounded bg-green-500 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                                    >
                                        Accept
                                    </button>
                                </td>

                                <td className="whitespace-nowrap px-4 py-2">
                                    <button
                                        onClick={() => handleReject(data._id, data.id,)}
                                        className="inline-block rounded bg-red-500 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
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