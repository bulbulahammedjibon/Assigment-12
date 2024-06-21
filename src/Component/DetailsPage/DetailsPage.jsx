import { useState } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { Link, useLoaderData, useParams } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin/useAdmin";
import useAgent from "../../Hooks/UseAgent/UseAgent";
import useAuth from "../../Hooks/UseAuth/UseAuth";
import MyReview from "../../Layout/Dashboard/UserProfile/MyProfile/MyReview";
import LatestUserReview from "../LatestUserReview/LatestUserReview";
import useAxiosPublic from "../../Hooks/AxiosPublic/axiosPublic";
import { toast } from "react-toastify";
import DetailsReview from "./DetailsReview/DetailsReview";



const DetailsPage = () => {

    const time = new Date();
    console.log(time);

    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const [isAdmin] = useAdmin();
    const [isAgent] = useAgent();
    let userLoggen = true;
    if (isAdmin || isAgent) {
        userLoggen = false;
    }

    const detailsData = useLoaderData();
    console.log(detailsData);
    const { _id, image, location, min_price, max_price, agent_name,agent_email, agent_photo, description, verification_status, title } = detailsData;
    // handle form
    const handleSubmit = e => {
        e.preventDefault();
        const review = e.target.review.value;
        // console.log(review);
        const reviewData = {
            review: review,
            property_image: image,
            property_location: location,

            id: _id,
            user_email: user?.email,
            user_name: user?.displayName,
            user_photo: user?.photoURL,
            property_title: title,
            agent_Name: agent_name,
            agent_photo: agent_photo,
            time: time,
        }
        console.log(reviewData);

        axiosPublic.post('/user/review', reviewData)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    toast.success('Review Added SuccessFully')
                }
            })
            .catch(error => console.log(error.message));

    }

    // handle Wish List
    const handleWishListSubmit = e => {
        e.preventDefault();

        const wishListData = {
            id: _id,
            property_image:image,
            property_location:location,
            user_email: user?.email,
            user_name: user?.displayName,
            user_photo: user?.photoURL,
            title: title,
            agent_Name: agent_name,
            agent_email:agent_email,
            agent_photo:agent_photo,
            verification_status: verification_status,
            min_price: min_price,
            max_price: max_price,
        }
        axiosPublic.post('/wish-list', wishListData)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    toast.success('WishList Added')
                }
            })
            .catch(error => {
                console.log(error.message);
                toast.error(error.message);
            })


    }




    // const { propertyImage, propertyTitle, propertyLocation, agentName, agentImage, verificationStatus, priceRange } = data;
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                <div className="mx-4">
                    <img src={image} alt="" />
                </div>

                <div className="mx-4 space-y-4">
                    <p>{title}</p>
                    <dd className="text-sm text-gray-500">${min_price} - {(max_price)}</dd>
                    <p>Agent Name: {agent_name}</p>
                    <div className="flex gap-2">   <p><HiLocationMarker /></p>{location}</div>
                    <p>Verificaiton:  {verification_status}</p>
                    <p>Description:  {description}</p>
                    {/* Add wishList This wish list enable only user */}
                    {/* <Link to='/dashboard/wishlist'>   </Link> */}
                    <button onClick={handleWishListSubmit} disabled={!userLoggen} className="btn bg-green-500 w-full   max-w-3xl">Add WishList</button>


                </div>


            </div>


            {/* Review Section */}
            <div className="text-center my-5">
                <h3 className="text-3xl "> Review Section</h3>

                <DetailsReview id={_id} />

                {/* modal */}

                <h3 className="text-3xl">You Can Add User Review </h3>
                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                <button disabled={!userLoggen} className="btn bg-green-400 my-5" onClick={() => document.getElementById('my_modal_4').showModal()}>Add Review</button>
                <dialog id="my_modal_4" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                        {/* add review */}
                        <div className="max-w-xl mx-auto text-center my-5">
                            <form onSubmit={handleSubmit}>
                                <label className="form-control">
                                    <div className="label">
                                        <span className="label-text">Add Review</span>
                                    </div>
                                    <textarea className="textarea textarea-bordered h-24" name="review" placeholder="Add Review"></textarea>
                                    <input className="btn btn-success my-4" type="submit" value="Submit" />
                                </label>
                            </form>
                        </div>

                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>





            </div>


        </div>
    );
};

export default DetailsPage;