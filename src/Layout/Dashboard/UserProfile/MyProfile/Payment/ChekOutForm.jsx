import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import useCart from "../../../hooks/useCart";
// import useAuth from "../../../hooks/useAuth";
// import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../../../Hooks/AxiosPublic/axiosPublic";
import useAuth from "../../../../../Hooks/UseAuth/UseAuth";


const CheckoutForm = ({id}) => {
    const { user } = useAuth();
    console.log(id)
    const [paymentError, setPaymentError] = useState('');
    const [price,setPrice] = useState(0);
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosPublic = useAxiosPublic();
    

    // const navigate = useNavigate();


    const offerPrice =async () =>{
      await  axiosPublic(`/price-count/${id}`)
        .then(res=>{
            console.log(res.data.offer_amount);
            setPrice(res.data.offer_amount);

        }).catch(err=>console.log(err.message))
    }

    useEffect(() => {
        offerPrice()
        if (price > 0) {
            axiosPublic.post('/create-payment-intent', { price: price })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosPublic,price])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }
    

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('PaymentMethod error', error);
            setPaymentError(error.message);
        }
        else {
            console.log('Payment Stripe', paymentMethod);
            setPaymentError('');
        }
    

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error')
        }
       
    
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // now save the payment in the database
                const payment = {
                    id:id,
                    transactionId: paymentIntent.id,
                    date: new Date(), // utc date convert. use moment js to 
                   buying_status: 'sold',
                }

                const res = await axiosPublic.put('/payments-update', payment);
                console.log('payment saved', res.data);
                 
                if (res.data?.paymentResult?.insertedId) {
                    // toast.success('added')
                  
                }

            }
        }

    }

    return (
        <form className=""  onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '20px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-info btn-primary my-4" type="submit" disabled={!stripe  }>
                Pay
            </button>
            <p className="text-red-500">{paymentError}</p>
            {/* {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>} */}
        </form>
    );
};

export default CheckoutForm;





// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import {loadStripe} from '@stripe/stripe-js';

// const ChekOutForm = () => {

//     const handleSubmit = async (event) => {
//         // Block native form submission.
//         event.preventDefault();
    
//         if (!stripe || !elements) {
//           // Stripe.js has not loaded yet. Make sure to disable
//           // form submission until Stripe.js has loaded.
//           return;
//         }
    
//         // Get a reference to a mounted CardElement. Elements knows how
//         // to find your CardElement because there can only ever be one of
//         // each type of element.
//         const card = elements.getElement(CardElement);
    
//         if (card == null) {
//           return;
//         }
    
//         // Use your card Element with other Stripe.js APIs
//         const {error, paymentMethod} = await stripe.createPaymentMethod({
//           type: 'card',
//           card,
//         });
    
//         if (error) {
//           console.log('[error]', error);
//         } else {
//           console.log('[PaymentMethod]', paymentMethod);
//         }
//       };


//     return (
//         <form onSubmit={handleSubmit}>
//       <CardElement
//         options={{
//           style: {
//             base: {
//               fontSize: '16px',
//               color: '#424770',
//               '::placeholder': {
//                 color: '#aab7c4',
//               },
//             },
//             invalid: {
//               color: '#9e2146',
//             },
//           },
//         }}
//       />
//       <button type="submit" disabled={!stripe}>
//         Pay
//       </button>
//     </form>
//     );
// };

// export default ChekOutForm;