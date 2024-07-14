import { useState, useCallback } from "react";

const useRazorpayPayment = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadRazorpay = useCallback((): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }, []);

  const initiatePayment = useCallback(
    async (orderDetails: TOrderDetails) => {
      setLoading(true);
      setError(null);

      try {
        const scriptLoaded = await loadRazorpay();
        if (!scriptLoaded) {
          throw new Error(
            "Failed to load payment gateway. Please try again later."
          );
        }

        const options = {
          key: "rzp_live_fnUbrOwBnEKoYL",
          amount: orderDetails.amount * 100,
          currency: "INR",
          name: "WOODLAND",
          description: "Order Payment",
          image: "/headerlogo.png",
          order_id: orderDetails.razorpayOrderId,
          callback_url: "https://capcons.com/go-orders/verify?circle=woodland",
          prefill: {
            name: orderDetails.name,
            email: orderDetails.email,
            contact: orderDetails.phone,
          },
          notes: {
            address: orderDetails.address,
          },
          theme: {
            color: "#000000",
          },
        };

        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [loadRazorpay]
  );

  return { initiatePayment, loading, error };
};

export default useRazorpayPayment;
