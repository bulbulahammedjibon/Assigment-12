import { useEffect, useState } from "react";
import useAuth from "../../../../Hooks/UseAuth/UseAuth";
import useAxiosPublic from "../../../../Hooks/AxiosPublic/axiosPublic";



const ManageUsers = () => {
    const { user } = useAuth();
    const [data, setData] = useState([]);
    const axiosPublic = useAxiosPublic();


    useEffect(() => {
        axiosPublic(`/manage-user `)
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
    }, [])

    const handleMakeAdmin = id => {
        axiosPublic(`/make-admin/${id}`)
            .then(res => {
                console.log(res.data);
            }).catch(err => console.log(err.message));
    }


    const handleMakeAgent = id => {
        axiosPublic(`/make-agent/${id}`)
            .then(res => {
                console.log(res.data);
            }).catch(err => console.log(err.message));
    }

    const handleMarkAsFraud = id => {
        axiosPublic(`/mark-as-fraud/${id}`)
            .then(res => {
                console.log(res.data);
            }).catch(err => console.log(err.message));
    }


    const handleDeleteUser = id => {
        axiosPublic(`/delete-user/${id}`)
            .then(res => {
                console.log(res.data);
            }).catch(err => console.log(err.message));
    }


    return (
        <div>
            <h3>Manage Users</h3>


            <div className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">User name</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">User email</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Make admin button</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Make agent button</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Mark as fraud button </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Delete user  </th>

                            <th className="px-4 py-2"></th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">

                        {
                            data.map(data => <tr key={data._id}>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{data.name}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{data.email}</td>


                                <td><button onClick={() => handleMakeAdmin(data._id)}
                                    //  className="btn bg-green-400 btn-sm"
                                    className={` btn btn-sm && ${data.verification_status === 'verified' || data.verification_status === 'rejected' ? 'btn-disabled' : 'btn-success '
                                        }`}

                                >Make Admin</button></td>


                                <td><button onClick={() => handleMakeAgent(data._id)}
                                    // className="btn bg-red-400 btn-sm"
                                    className={` btn btn-sm && ${data.verification_status === 'verified' || data.verification_status === 'rejected' ? 'btn-disabled' : 'btn-success '}`}
                                >Make Agent</button></td>

                                <td><button onClick={() => handleMarkAsFraud(data._id)}
                                    // className="btn bg-red-400 btn-sm"
                                    className={` btn btn-sm && ${data.verification_status === 'verified' || data.verification_status === 'rejected' ? 'btn-disabled' : 'bg-red-500 '}`}
                                >Mark As Fraud</button></td>

                                <td><button onClick={() => handleDeleteUser(data._id)}
                                    // className="btn bg-red-400 btn-sm"
                                    className={` btn btn-sm && ${data.verification_status === 'verified' || data.verification_status === 'rejected' ? 'btn-disabled' : 'bg-red-500 '}`}
                                >Delete User  </button></td>

                                {/* rejected */}




                            </tr>)
                        }





                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;