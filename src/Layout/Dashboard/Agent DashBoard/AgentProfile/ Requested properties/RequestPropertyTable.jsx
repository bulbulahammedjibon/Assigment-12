import useAxiosPublic from "../../../../../Hooks/AxiosPublic/axiosPublic";


const RequestPropertyTable = ({data}) => {

    let dis = false;
    if(data.status === 'accepted'){
        dis= 'disabled';
    }

    const handleAccept = (_id, id) => {
        const status = {
            status: 'accepted',
            _id: _id,
            id: id,

        };
        useAxiosPublic.patch(`/update-accept/${id}`, status)
            .then(res => {
                console.log(res.data);
            })
        // console.log(id,_id)
    }
    return (
        <div>
            <tr >
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"> {data.title}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{data.location}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{data.user_name}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{data.user_email}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{data.offer_amount}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{data.status}</td>
                <td className="whitespace-nowrap px-4 py-2">
                    <button
                    disabled={dis}
                    

                        onClick={() => handleAccept(data._id, data.id)}
                        className="btn btn-sm btn-accent"
                    >
                        Accept  
                    </button>
                </td>

                <td className="whitespace-nowrap px-4 py-2">
                    <button
                        disabled={dis}
                        className=" btn btn-sm btn-error"
                    >
                        Reject
                    </button>
                </td>
            </tr>
        </div>
    );
};

export default RequestPropertyTable;