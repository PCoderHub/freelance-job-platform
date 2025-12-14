import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { confirmPayment, payment } from "../services/paymentServices";
import { toast } from "react-toastify";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function PaymentForm({ job }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  console.log("Stripe key:", import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const { data } = await payment(job._id);

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        console.error(error);
        toast.error(error.message);
      } else {
        await confirmPayment(data.transactionId);
        toast.success("Payment Successful!");
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      toast.error("Payment failed");
    }
    setLoading(false);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <CardElement />
      <button
        className="bg-blue-300 p-2 rounded-sm"
        onClick={handlePayment}
        disabled={!stripe || loading}
        style={{ marginTop: "10px" }}
      >
        Pay £{job.budget}
      </button>
    </div>
  );
}

export default function StripePayment({ job }) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm job={job} />
    </Elements>
  );
}
