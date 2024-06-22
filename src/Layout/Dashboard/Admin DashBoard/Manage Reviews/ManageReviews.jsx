import { useEffect, useState } from "react";
import useAuth from "../../../../Hooks/UseAuth/UseAuth";
import useAxiosPublic from "../../../../Hooks/AxiosPublic/axiosPublic";


const ManageReviews = () => {
    const { user } = useAuth();
    const [data, setData] = useState([]);
    const axiosPublic = useAxiosPublic();


    const allReview = () => {
        axiosPublic(`/manage-all-review `)
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
    }

    useEffect(() => {
        allReview();
    }, [])

    const handleDeleteReview = id => {
        axiosPublic.delete(`/delete-review/${id} `)
            .then(res => {
                console.log(res.data);
                allReview();
                // setData(res.data);
            })
    }


    return (
        <div className="container mx-auto ">
            <h3>Manage Reviews</h3>

            <div className="grid grid-cols-1 gap-6 mx-10 my-5 md:grid-cols-2 lg:grid-cols-3">
                {
                    data.map(data => <div key={data._id} className="rounded-xl border  bg-gray-50 p-4">
                        <div className="flex items-center gap-4">
                            <img
                                alt=""
                                src={data.user_photo}
                                className="size-16 rounded-full object-cover"
                            />

                            <div>
                                <h3 className="text-lg font-medium text-black">{data.user_name}</h3>

                                <div className="flow-root">
                                    <ul className="-m-1 flex flex-wrap">
                                        <li className="p-1 leading-none">
                                            <a href="#" className="text-xs font-medium text-black"> {data.user_email} </a>
                                        </li>


                                    </ul>
                                </div>
                            </div>
                        </div>

                        <ul className="mt-4 space-y-2">
                            <li>
                                <a href="#" className="block h-full rounded-lg p-4">
                                    {/* <strong className="font-medium text-black">Project A</strong> */}

                                    <p className="mt-1 text-xs font-medium text-black">
                                        {data.review}
                                    </p>
                                </a>
                            </li>

                            <li>
                                <button onClick={() => handleDeleteReview(data._id)} className="btn btn-success text-white">Delete</button>
                            </li>
                        </ul>
                    </div>)
                }
            </div>
        </div>
    );
};

export default ManageReviews;