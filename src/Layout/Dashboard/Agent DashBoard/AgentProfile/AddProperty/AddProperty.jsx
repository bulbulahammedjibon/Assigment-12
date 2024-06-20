import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../../../Hooks/AxiosPublic/axiosPublic";
import { toast } from "react-toastify";
import useAuth from "../../../../../Hooks/UseAuth/UseAuth";

const image_hosting_key = import.meta.env.VITE_IMAGEBB;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProperty = () => {
    const { user } = useAuth();
    console.log(user);
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        console.log(data)

        // image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            // now send the menu item data to the server with the image url
            const propertyData = {
                title: data.title,
                location: data.location,
                min_price: data.minPrice,
                max_price: data.maxPrice,
                verification_status: 'pending',
                image: res.data.data.display_url,
                agent_name: user?.displayName,
                agent_photo: user?.photoURL,
                agent_email: user?.email,
                description: data.description,
            }
            // 
            const propertyRes = await axiosPublic.post('/property', propertyData);
            console.log(propertyRes.data)
            if (propertyRes.data.insertedId) {
                // show success popup

                toast.success("successFully Property Added");
                reset();

            }
        }
        console.log('with image url', res.data);
    };

    return (
        <div className="container mx-auto ">

            <div className="   ">
                <form className=" max-w-xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Property Title*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Property Title"
                            {...register('title', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>

                    {/* category */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Property Location*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Property Location"
                            {...register('location', { required: true })}
                            className="input input-bordered w-full" />
                    </div>

                    {/* agent information */}
                    <div className="flex gap-5">
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Agent Name</span>
                            </label>
                            <input
                                type="text"
                                disabled
                                placeholder="Agent Name"
                                defaultValue={user?.displayName}
                                {...register( "agentName")}
                                className="input input-bordered w-full" />
                        </div>

                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Agent Email</span>
                            </label>
                            <input
                                type="text"
                                disabled
                                placeholder="Agent Email"
                                defaultValue={user?.email}
                                {...register('agentEmail' )}
                                className="input input-bordered w-full" />
                        </div>

                    </div>

                    <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Property Description</span>
                            </label>
                            <input
                                type="text"
                               
                                placeholder="Property Description"
                               
                                {...register('description' , { required: true })}
                                className="input input-bordered w-full" />
                        </div>

                    {/* price */}
                    <div className="flex gap-5">
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Minimum Price Range*</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Price Range"
                                {...register('minPrice', { required: true })}
                                className="input input-bordered w-full" />
                        </div>

                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Maximum Price Range*</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Price Range"
                                {...register('maxPrice', { required: true })}
                                className="input input-bordered w-full" />
                        </div>
                    </div>



                    <div className="form-control w-full my-6">
                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                    </div>

                    <button className="btn">
                        Add Item
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProperty;