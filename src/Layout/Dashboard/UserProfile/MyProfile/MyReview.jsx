import { useEffect, useState } from "react";
import useAuth from "../../../../Hooks/UseAuth/UseAuth";
import useAxiosPublic from "../../../../Hooks/AxiosPublic/axiosPublic";
import MyReviewCard from "./MyReviewCard";

const MyReview = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic(`/reviews/${user?.email}`).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);
  return (
    <div>
      <section className="">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <h2 className="text-center text-4xl font-bold tracking-tight text-gray-500 sm:text-5xl">
            Read trusted reviews from our customers
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
            {data.map((card) => (
              <MyReviewCard key={card._id} card={card} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyReview;
