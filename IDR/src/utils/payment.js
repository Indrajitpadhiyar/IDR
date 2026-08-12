import toast from 'react-hot-toast';

/**
 * Helper to dynamically load the Cashfree checkout script.
 */
export const loadCashfreeScript = () => {
  return new Promise((resolve) => {
    // Check if script is already present
    if (window.Cashfree) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
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
 * Initiates Cashfree checkout flow.
 * @param {Object} params
 * @param {string} params.planName - Name of plan selected (Basic, Professional, Enterprise)
 * @param {Object} params.user - Logged in user object (id, name, email, phone)
 * @param {Function} params.onSuccess - Callback on verified payment (optional)
 * @param {Function} params.onInitiated - Callback when checkout modal opens (optional)
 */
export const initiatePayment = async ({ planName, user, onSuccess, onInitiated }) => {
  const isLoaded = await loadCashfreeScript();
  if (!isLoaded) {
    toast.error("Cashfree payment SDK failed to load. Please check your internet connection.");
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

    const { order, isSandbox } = orderData;

    // 2. Initialize Cashfree instance
    const cashfree = window.Cashfree({
      mode: isSandbox ? "sandbox" : "production"
    });

    if (onInitiated) onInitiated();

    // 3. Initiate checkout using _modal redirection target
    const checkoutOptions = {
      paymentSessionId: order.payment_session_id,
      redirectTarget: "_modal"
    };

    console.log("Opening Cashfree checkout modal...", checkoutOptions);
    cashfree.checkout(checkoutOptions).then((result) => {
      if (result.error) {
        toast.error(result.error.message || "Payment checkout failed or closed.");
        console.error("Cashfree checkout error:", result.error);
      }
      if (result.redirect) {
        console.log("Redirecting to Cashfree hosted checkout...");
      }
    });

  } catch (error) {
    toast.dismiss(orderToast);
    toast.error("An error occurred while connecting to payment gateway.");
    console.error(error);
  }
};
