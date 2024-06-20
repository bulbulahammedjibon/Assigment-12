import { HiLocationMarker } from "react-icons/hi";
import { PiCurrencyCircleDollarFill } from "react-icons/pi";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Link } from "react-router-dom";


const AllPropertyCard = ({ card }) => {
    const {_id, image, location, min_price,max_price,agent_name,agent_photo, verification_status,title } = card;
    return (
        <div>
            <a href="#" className="block rounded-lg p-4 shadow-sm shadow-indigo-100">
                <img
                    src={image}
                    className="h-56 w-full rounded-md object-cover"
                />

                <div className="mt-2">
                    <dl>
                        <div className="flex gap-2">
                            <dt className="sr-only">Price</dt>
                            <PiCurrencyCircleDollarFill />
                            <dd className="text-sm text-gray-500">${min_price} - {(max_price)}</dd>
                        </div>

                        <div>
                            {/* <dt className="sr-only">Address</dt> */}

                            <dd className="font-medium"> {title}</dd>
                        </div>

                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                           

                            <div className="mt-1.5 flex gap-2 items-center sm:mt-0">
                                <p><HiLocationMarker /></p>
                              <p className="font-medium">{location}
                                </p>
                            </div>
                        </div>

                    </dl>

                    <div className="mt-3 flex items-center gap-8 text-xs">
                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <img className="w-8 h-8 rounded-full" src={agent_photo} alt="" />

                            <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-500">Agent Name</p>

                                <p className="font-medium">{agent_name}</p>
                            </div>
                        </div>

                        
                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                        <RiVerifiedBadgeFill   />

                            <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-500">Verification</p>

                                <p className="font-medium">{verification_status}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Link to={`/details-page/${_id}`}>
                        <button className="btn w-full my-6 bg-green-400">View Details</button>
                    </Link>
                </div>
            </a>
        </div>
    );
};

export default AllPropertyCard;