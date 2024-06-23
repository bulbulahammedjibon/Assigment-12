

import { toast } from "react-toastify";
import useAuth from "../../../../Hooks/UseAuth/UseAuth";
import { useLoaderData, useParams } from "react-router-dom";
import useAxiosPublic from "../../../../Hooks/AxiosPublic/axiosPublic";


const UpdateAddProperty = () => {

    const propertyData = useLoaderData();
    console.table(propertyData);

    const axiosPublic = useAxiosPublic();
    // const { _id, agentEmailURL, productName, boycottingReason, productBrand, location, userData } = propertyData;
    // const { id } = useParams();
    // console.log(id);

    const Auth = useAuth();
    const { user } = Auth;
    // console.log(user);

    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.target;
        const image = form.propertyImage.value;
        const title = form.PropertyTitle.value;
        const location = form.location.value;
       
        const max_price = form.max_price.value;
        const min_price = form.min_price.value;
        const userUpdateData = { image, title,max_price,min_price, location, };
        console.table(userUpdateData);

        try {
            const { data } = await axiosPublic.patch(`update-property/${propertyData._id}`, userUpdateData)
            console.log(data);
            toast.success('Update Successfully');
        }
        catch (error) {
            console.log(error.message,error);
            toast.error('Request failed')
        }





    }

    return (
        <div>
            <div className="   ">
                <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-lg dark:bg-gray-800">
                    <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Property Update</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 sm:grid-cols-2">
                            <div>
                                <label className="text-gray-700 dark:text-gray-200" >Property Image</label>
                                <input id="username" type="text" defaultValue={propertyData.image} name="propertyImage" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                            <div >
                                <label className="text-gray-700 dark:text-gray-200" > Property Title</label>
                                <input id="emailAddress" type="text" defaultValue={propertyData.title} name="PropertyTitle" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label className="text-gray-700 dark:text-gray-200" >Location</label>
                                <input type="text" name="location" defaultValue={propertyData.location} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label className="text-gray-700 dark:text-gray-200" >Agent Name</label>
                                <input type="text" name="agentName" disabled defaultValue={propertyData.agent_name} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label className="text-gray-700 dark:text-gray-200">  Agent Email</label>
                                <input type="email" disabled name="agentEmail" defaultValue={propertyData.agent_email} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                               <div>
                               <label className="text-gray-700 dark:text-gray-200">Minimum  Price Range</label>
                                <input type="number" name="min_price" defaultValue={propertyData.min_price} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                               </div>

                               <div>
                               <label className="text-gray-700 dark:text-gray-200">Maximum  Price Range</label>
                                <input type="number" name="max_price"  defaultValue={propertyData.max_price} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                               </div>
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Update</button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default UpdateAddProperty;

