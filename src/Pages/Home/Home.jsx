import Advertisement from "../../Component/Advertisemt section/Advertisement";
import AdvertisementReview from "../../Component/Advertisemt section/AdvertisementReview";
import FaqSection from "../../Component/FaqSection/FaqSection";
import LatestUserReview from "../../Component/LatestUserReview/LatestUserReview";

const Home = () => {
    return (
        <div className="container mx-auto">
            <h2 className="text-3xl text-center font-bold">Advertisement </h2>
            <Advertisement/>

            {/* <AdvertisementReview/> */}
            <LatestUserReview/>

            <FaqSection/>
        </div>
    );
};

export default Home;