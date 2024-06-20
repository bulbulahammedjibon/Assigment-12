

const WishListCard = ({ list }) => {
    return (
        <div>
            <div href="#" className="block   rounded-lg p-4 shadow-sm shadow-indigo-100">
                <img
                    alt=""
                    src={list.property_image}
                    className="h-56 w-full rounded-md object-cover"
                />

                <div className="mt-2">
                    <dl>
                        <div>
                            <dt className="sr-only">Price</dt>

                            <dd className="text-sm text-gray-500">${list.min_price} - {(list.max_price)}</dd>
                        </div>

                        <div>
                            <dt className="sr-only">Address</dt>

                            <dd className="font-medium">{list.title}</dd>
                            <dd className="font-medium my-1">{list.property_location}</dd>

                        </div>
                    </dl>

                    <div className="mt-6 flex items-center gap-8 text-xs">
                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <img className="w-8 h-8 rounded-full" src={list.agent_photo} alt="" />

                            <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-500">Agent Name</p>

                                <p className="font-medium">{list.agent_Name}</p>
                            </div>
                        </div>

                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <svg
                                className="size-4 text-indigo-700"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                />
                            </svg>

                            <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-500">Verification Status</p>

                                <p className="font-medium">{list.verification_status}</p>
                            </div>
                        </div>


                    </div>
                    <div className="flex justify-around mt-7">
                        <button className="btn btn-success">Make Offer</button>
                        <button className="btn btn-error">Remove</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WishListCard;