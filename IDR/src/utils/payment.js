import toast from 'react-hot-toast';

/**
 * Helper to dynamically load the Razorpay checkout script.
 */
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    // Check if script is already present
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

/**
 * Initiates Razorpay checkout flow.
 * @param {Object} params
 * @param {string} params.planName - Name of plan selected (Basic, Professional, Enterprise)
 * @param {Object} params.user - Logged in user object (id, name, email, phone)
 * @param {Function} params.onSuccess - Callback on verified payment
 * @param {Function} params.onInitiated - Callback when Razorpay modal opens
 */
export const initiatePayment = async ({ planName, user, onSuccess, onInitiated }) => {
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded) {
    toast.error("Razorpay payment SDK failed to load. Please check your internet connection.");
    return;
  }

  // Dynamic base URL resolution (avoids build-time bake-in conflicts)
  const hostname = window.location.hostname;
  const isLocal = hostname === "localhost" || hostname === "127.0.0.1";
  let baseUrl = isLocal ? "http://localhost:4000" : "https://idr-backend-49rq.onrender.com";

  if (import.meta.env.VITE_API_BASE) {
    const envUrl = import.meta.env.VITE_API_BASE.replace(/^"(.*)"$/, "$1").replace(/\/$/, "");
    // Ignore localhost override in production to prevent mixed-content blocks
    if (!(isLocal === false && envUrl.includes("localhost"))) {
      baseUrl = envUrl;
    }
  }

  const stored = localStorage.getItem('idrtech_auth');
  const auth = stored ? JSON.parse(stored) : null;
  const token = auth?.user?.token;

  if (!token) {
    toast.error("You must be logged in to complete payment.");
    return;
  }

  const orderToast = toast.loading(`Preparing secure checkout for ${planName} Plan...`);

  try {
    // 1. Create order on Backend
    const orderResponse = await fetch(`${baseUrl}/api/user/payments/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ planName })
    });

    const orderData = await orderResponse.json();
    
    if (!orderData.success) {
      toast.dismiss(orderToast);
      toast.error(orderData.message || "Failed to create payment order.");
      return;
    }

    toast.dismiss(orderToast);

    const { order, key } = orderData;

    // 2. Setup Razorpay Checkout Modal (using synchronous handler for reliability)
    const options = {
      key: key, 
      amount: order.amount,
      currency: order.currency,
      name: "IDR TECH",
      description: `${planName} AMC Subscription`,
      image: "/IDR.jpeg",
      order_id: order.id,
      handler: function (response) {
        const verifyToast = toast.loading("Verifying transaction signature...");
        
        fetch(`${baseUrl}/api/user/payments/verify-payment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            planName
          })
        })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((verifyData) => {
          toast.dismiss(verifyToast);
          if (verifyData.success) {
            toast.success("Payment successful! Your AMC has been activated.");
            if (onSuccess) onSuccess(verifyData);
          } else {
            toast.error(verifyData.message || "Payment verification failed.");
          }
        })
        .catch((verifyError) => {
          toast.dismiss(verifyToast);
          toast.error("Connection error during payment verification.");
          console.error(verifyError);
        });
      },
      prefill: {
        name: user.name || `${user.firstName} ${user.lastName}`,
        email: user.email,
        contact: user.phone || ""
      },
      notes: {
        userId: user.id
      },
      theme: {
        color: "#0b63f6"
      },
      modal: {
        ondismiss: () => {
          toast.error("Payment checkout cancelled.");
        }
      }
    };

    if (onInitiated) onInitiated();

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    toast.dismiss(orderToast);
    toast.error("An error occurred while connecting to payment gateway.");
    console.error(error);
  }
};
