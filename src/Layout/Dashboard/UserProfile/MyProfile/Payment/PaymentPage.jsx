
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import ChekOutForm from './ChekOutForm';
import { useParams } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const PaymentPage = () => {
    const {id} = useParams();
    console.log(id)
    return (
        <div>
            <h3>Payment</h3>
            <div>
                <Elements stripe={stripePromise}>
                    <ChekOutForm id={id} />
                </Elements>
            </div>
        </div>
    );
};

export default PaymentPage;