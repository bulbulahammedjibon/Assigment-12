import { Link } from "react-router-dom";


const AdvertisemntCard = ({ card }) => {
    const {_id, image, location, min_price,max_price, verification_status, } = card;
    // const price = {min_price , max_price}
    return (
        <div>
            <div className="card   bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={image}   className="h-48 rounded-xl" />
                </figure>
               
                <div className="card-body  ">
                <p>Price Range:  {min_price - max_price}</p>
                    <h2 className="card-title">{location}</h2>
                    <p >verification status: <span className="bg-green-400 rounded-lg w-fit px-2 py-1">{verification_status}</span></p>
                    <div className=" my-2 text-center ">
                       <Link to={`/details-page/${_id}`}>
                       <button className="btn w-full btn-primary">View Details</button>
                       </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvertisemntCard;