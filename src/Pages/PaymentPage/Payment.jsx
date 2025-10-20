import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe('pk_test_51RrMKmK98oZyJd6Roy7ClKUXuKtJaPPVAtcPfirCs7EtuHTEEU96ThYNnPiZM79CNlUFhYKBi2sYpiwR45cJ4whe00f6TUNcLU');



const Payment = ({ trainerId, trainerName, selectedSlot, selectedPackage }) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm 
        trainerId={trainerId}
        trainerName={trainerName}
        selectedSlot={selectedSlot}
        selectedPackage={selectedPackage}
      />
    </Elements>
  );
};

export default Payment;
