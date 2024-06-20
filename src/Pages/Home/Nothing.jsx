import { useForm } from "react-hook-form";
 
import { FaUtensils } from "react-icons/fa";
 

import useAxiosPublic from "../../Hooks/AxiosPublic/axiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGEBB;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
  
    const onSubmit = async (data) => {
        console.log(data)
        // image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] }
        console.log(imageFile);
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        
        console.log( 'with image url', res.data);
    };

    return (
        <div>
           
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    
                    <div className="flex gap-6">
                        {/* category */}
                        

                        {/* price */}
                       

                    </div>
                    {/* recipe details */}
                   
                    <div className="form-control w-full my-6">
                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                    </div>

                    <button className="btn">
                        Add Item <FaUtensils className="ml-4"></FaUtensils>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;