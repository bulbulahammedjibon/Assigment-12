
import useAxiosPublic from "../AxiosPublic/axiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../UseAuth/UseAuth";



const useAgent = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { data: isAgent, isPending: agentLoading } = useQuery({
        queryKey: [user?.email, 'isAgent'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/agent/${user.email}`);
            // console.log(res.data);
            return res.data?.agent;
        }
    })
    return [isAgent, agentLoading]
};

export default useAgent;