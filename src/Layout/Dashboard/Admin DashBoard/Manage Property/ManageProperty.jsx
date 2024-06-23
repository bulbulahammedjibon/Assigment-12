import { useEffect, useState } from "react";
import useAuth from "../../../../Hooks/UseAuth/UseAuth";
import useAxiosPublic from "../../../../Hooks/AxiosPublic/axiosPublic";


const ManageProperty = () => {

    const { user } = useAuth();
    const [data, setData] = useState([]);
    const axiosPublic = useAxiosPublic();


    useEffect(() => {
    axiosPublic(`/property-admin-manage `)
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
    }, [])


    const handleVerified = id => {
        axiosPublic.patch(`/verified-user/${id}`)
            .then(res => {
                console.log(res.data);

            }).catch(err => console.log(err.message));
    }

    const handleReject = id => {
        axiosPublic.patch(`/reject-user/${id}`)
            .then(res => {
                console.log(res.data);

            }).catch(err => console.log(err.message));
    }


    return (
        <div>
          

            {/*
  Heads up! 👋

  This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
*/}

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">property title</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Property location</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Agent name</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">agent email</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">price range</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">verify  </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">reject</th>
                            <th className="px-4 py-2"></th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">

                        {
                            data.map(data => <tr key={data._id}>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{data.title}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{data.location}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{data.agent_name}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{data.agent_email}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">${data.min_price} - {(data.max_price)}</td>

                                <td><button onClick={() => handleVerified(data._id)}
                                    //  className="btn bg-green-400 btn-sm"
                                    className={` btn btn-sm && ${data.verification_status === 'verified' || data.verification_status === 'rejected' ? 'btn-disabled' : 'btn-success '
                                        }`}

                                >Verify</button></td>


                                <td><button onClick={() => handleReject(data._id)}
                                    // className="btn bg-red-400 btn-sm"
                                    className={` btn btn-sm && ${data.verification_status === 'verified' || data.verification_status === 'rejected' ? 'btn-disabled' : 'bg-red-500 '}`}
                                >Reject</button></td>

                                {/* rejected */}




                            </tr>)
                        }





                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProperty;