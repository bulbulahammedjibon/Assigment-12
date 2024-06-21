import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosPublic from "../../../../Hooks/AxiosPublic/axiosPublic";



const MakeAnOffer = () => {
    const loadData = useLoaderData();
    const axiosPublic = useAxiosPublic();
    console.log(loadData);



    const handleMakeOffer = e => {
        e.preventDefault();
        console.log('ami');
        const price = parseFloat(e.target.price.value);
        const date = e.target.date.value;
        // console.log(price,loadData.max_price,loadData.min_price,date);


        if (loadData.max_price < price || loadData.min_price > price) {
            toast.error("Offer Price Requrement Not Fullfil");
            return
        }

        const propertyBrought = {
            location: loadData.property_location,
            title: loadData.title,
            agent_name: loadData.agent_Name,
            user_email: loadData.user_email,
            user_name: loadData.user_name,
            image: loadData.property_image,
            offer_amount: price,
            status: 'pending',
            id: loadData._id,
            date: date,

        }

        console.table(propertyBrought);
        axiosPublic.post('/offer-property',propertyBrought)
        .then(res=>{
            console.log(res.data);
            if(res.data.insertedId){
                toast.success("SuccessFully Added Offer")
            }
        })
        .catch(error=>{
            console.log(error.message);
            toast.error(error.message);
        })




    }
    return (
        <div className="container   mx-auto ">
            <form onSubmit={handleMakeOffer} className="mx-7 mx-auto">
                <div className="grid grid-cols-1 justify-center md:grid-cols-2  ">
                    <label className="form-control w-full max-w-md">
                        <div className="label">
                            <span className="label-text"> Property Title </span>
                        </div>
                        <input type="text" defaultValue={loadData.title} placeholder="Property title " className="input input-bordered w-full max-w-sm" />

                    </label>

                    <label className="form-control w-full max-w-md">
                        <div className="label">
                            <span className="label-text">Property location</span>
                        </div>
                        <input type="text" defaultValue={loadData.property_location} placeholder="Type here" className="input input-bordered w-full max-w-sm" />

                    </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2  ">
                    <label className="form-control w-full max-w-sm">
                        <div className="label">
                            <span className="label-text">Agent name</span>
                        </div>
                        <input type="text" defaultValue={loadData.agent_Name} placeholder="Type here" className="input input-bordered w-full max-w-sm" />

                    </label>

                    <label className="form-control w-full max-w-sm">
                        <div className="label">
                            <span className="label-text"> Buying date</span>
                        </div>
                        <input type="date" name="date" placeholder="Type here" className="input input-bordered w-full max-w-sm" />

                    </label>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2  ">
                    <label className="form-control w-full max-w-sm">
                        <div className="label">
                            <span className="label-text">buyer email</span>
                        </div>
                        <input type="text" defaultValue={loadData.user_email} placeholder="Type here" className="input input-bordered w-full max-w-sm" />

                    </label>

                    <label className="form-control w-full max-w-sm">
                        <div className="label">
                            <span className="label-text">buyer Name</span>
                        </div>
                        <input type="text" defaultValue={loadData.user_name} placeholder="Type here" className="input input-bordered w-full max-w-sm" />

                    </label>
                </div>

                <div className="text-center  mx-9">
                    <label className="form-control  w-full  ">
                        <div className="label">
                            <span className="label-text">Price</span>
                        </div>
                        <input type="text" name="price" placeholder="Offered Amount" className="input input-bordered w-full  max-w-4xl" />

                    </label>
                </div>

                <input className="btn btn-success  w-full my-6" type="submit" value="Offer " />
            </form>



            <div>

            </div>
        </div>
    );
};

export default MakeAnOffer;