import React, { useState, useEffect } from "react";
import DonateBanner from "../components/layouts/Banners/DonateBanner";
import {
  ShieldCheck,
  Heart,
  FileText,
  ArrowRight,
  Lock,
  Check,
} from "lucide-react";

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export default function Donate() {
  const [amount, setAmount] = useState(5000);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
  const [donorData, setDonorData] = useState({
    name: "",
    donorType: "",
    email: "",
    phone: "",
    pan: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const baseComplete =
      amount > 0 &&
      donorData.name.trim() &&
      donorData.donorType &&
      donorData.email.trim() &&
      donorData.phone.replace(/[\\s\\-\\(\\)]/g, "").length === 10 &&
      donorData.address1.trim() &&
      donorData.city.trim() &&
      donorData.state &&
      donorData.pincode.trim().length === 6;

    const panRequired = amount > 2000;
    const panValid = !panRequired || (donorData.pan && /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(donorData.pan));

    const noErrors = Object.values(errors).every((e) => !e);
    setIsFormComplete(baseComplete && panValid && noErrors);
  }, [donorData, amount, errors]);

  const predefinedAmounts = [5000, 20000, 50000, 100000];

  const validateForm = () => {
    let newErrors = {};
    if (!amount || amount < 1)
      newErrors.amount = "Minimum donation amount is 1";
    if (!donorData.name.trim()) newErrors.name = "Full Name is required";
    if (!donorData.donorType) newErrors.donorType = "Donor type is required";
    if (!donorData.email.trim() || !/\S+@\S+\.\S+/.test(donorData.email))
      newErrors.email = "Enter a valid email address (e.g. name@domain.com)";

    const phoneClean = donorData.phone.replace(/[\s\-\(\)]/g, "");
    if (!phoneClean) {
      newErrors.phone = "Phone number is required.";
    } else if (phoneClean.length !== 10) {
      newErrors.phone = "Mobile number must be 10 digits.";
    } else if (!/^[789]/.test(phoneClean)) {
      newErrors.phone = "Mobile number must start with 7, 8, or 9.";
    }

    if (amount > 2000) {
      if (!donorData.pan.trim()) newErrors.pan = "PAN No is required";
      else if (!/[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(donorData.pan.toUpperCase()))
        newErrors.pan = "Invalid PAN format";
    }

    if (!donorData.address1.trim()) newErrors.address1 = "Address is required";
    if (!donorData.city.trim()) newErrors.city = "City is required";
    if (!donorData.state) newErrors.state = "State is required";
    if (!donorData.pincode.trim() || !/^\d{6}$/.test(donorData.pincode))
      newErrors.pincode = "Valid Pincode required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);

      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js",
      );
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        setIsSubmitting(false);
        return;
      }

      try {
        const API_URL = import.meta.env.DEV
          ? "http://localhost:8081/api"
          : "/api";
        // 1. Create order on backend
        const orderResponse = await fetch(`${API_URL}/razorpay/order`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: amount }),
        });

        const orderData = await orderResponse.json();

        if (orderData.status !== "success") {
          alert("Server error creating order.");
          setIsSubmitting(false);
          return;
        }

        // 2. Initialize Razorpay Checkout
        const options = {
          key: "rzp_live_T4eNo30e9W84T9", // Live key
          amount: orderData.order.amount,
          currency: "INR",
          name: "Yuva Mitra",
          description: "Donation to Yuva Mitra",
          order_id: orderData.order.id,
          handler: async function (response) {
            // 3. Verify Payment Signature
            const API_URL = import.meta.env.DEV
              ? "http://localhost:8081/api"
              : "/api";
            const verifyResponse = await fetch(`${API_URL}/razorpay/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const verifyData = await verifyResponse.json();

            if (verifyData.status === "success") {
              setIsSubmitting(false);
              setSubmitStatus("success");
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              alert("Payment verification failed. Please contact support.");
              setIsSubmitting(false);
            }
          },
          prefill: {
            name: donorData.name,
            email: donorData.email,
            contact: donorData.phone,
          },
          theme: {
            color: "#0f1f5c",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.on("payment.failed", function (response) {
          alert("Payment failed: " + response.error.description);
          setIsSubmitting(false);
        });

        paymentObject.open();
      } catch (error) {
        console.error("Error during payment process:", error);
        alert("An error occurred during payment processing.");
        setIsSubmitting(false);
      }
    } else {
      const errorMessages = Object.values(errors).filter(Boolean);
      if (errorMessages.length > 0) {
        // If errors state isn't updated yet in this render, we can just alert a generic message
      }
      alert(
        "Please fill all required fields correctly. Check the highlighted fields.",
      );
    }
  };

  const handleChange = (field, value) => {
    let finalValue = value;
    if (field === "name") {
      finalValue = value.replace(/[0-9]/g, "");
    } else if (field === "phone") {
      finalValue = value.replace(/[^0-9]/g, "").slice(0, 10);
    }

    setDonorData({ ...donorData, [field]: finalValue });

    let newErrors = { ...errors };
    if (field === "phone") {
      const phoneClean = finalValue.replace(/[\s\-\(\)]/g, "");
      if (phoneClean.length > 0 && !/^[789]/.test(phoneClean)) {
        newErrors.phone = "Mobile number must start with 7, 8, or 9.";
      } else {
        newErrors.phone = null;
      }
    } else {
      if (newErrors[field]) newErrors[field] = null;
    }
    setErrors(newErrors);
  };

  const handleBlur = (field) => {
    let newErrors = { ...errors };
    if (field === "phone") {
      const phoneClean = donorData.phone.replace(/[\s\-\(\)]/g, "");
      if (
        phoneClean.length > 0 &&
        phoneClean.length < 10 &&
        /^[789]/.test(phoneClean)
      ) {
        newErrors.phone = "Mobile number must be 10 digits.";
      }
    } else if (field === "email") {
      if (donorData.email.trim() && !/\S+@\S+\.\S+/.test(donorData.email)) {
        newErrors.email = "Enter a valid email address (e.g. name@domain.com)";
      } else if (!donorData.email.trim()) {
        newErrors.email = "Email Address is required.";
      }
    }
    setErrors(newErrors);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-inter">
      <DonateBanner />

      <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-8 mt-12 relative z-20">
        {submitStatus === "success" ? (
          <div className="p-8 sm:p-16 bg-white rounded-3xl shadow-2xl border border-green-100 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <Check size={44} strokeWidth={3} />
            </div>
            <h2 className="text-[32px] font-bold font-poppins text-slate-900 mb-4">
              Donation Successful!
            </h2>
            <p className="text-slate-600 max-w-lg mx-auto mb-10 text-base sm:text-lg">
              Thank you for your generous contribution of{" "}
              <span className="font-bold text-blue-600">
                ₹{amount.toLocaleString("en-IN")}
              </span>
              . Your support drives our impact.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary hover:bg-red-700 hover-bounce text-white font-bold px-7 py-2.5 rounded-full shadow-lg shadow-primary/20 transition-all active:scale-95 font-poppins"
            >
              Make Another Donation
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Sidebar - Improved Mobile Spacing */}
            <div className="w-full lg:w-[32%] xl:w-[28%] lg:sticky lg:top-28 space-y-6">
              <div className="bg-[#0f1f5c] rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>

                <Heart
                  size={38}
                  className="text-red-400 mb-6"
                  fill="currentColor"
                />
                <h2 className="text-2xl font-bold font-Poppins mb-6 leading-tight">
                  Every rupee helps us build a better future.
                </h2>

                <div className="space-y-4">
                  {[
                    {
                      icon: ShieldCheck,
                      title: "SSL Secured",
                      desc: "Razorpay Protected",
                      color: "text-emerald-400",
                    },
                    {
                      icon: FileText,
                      title: "80G Eligible",
                      desc: "Tax Benefits Included",
                      color: "text-blue-300",
                    },
                    {
                      icon: Lock,
                      title: "FCRA Compliant",
                      desc: "Global Safety Standards",
                      color: "text-amber-400",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-white/15 transition-colors"
                    >
                      <div
                        className={`p-2 rounded-lg bg-white/10 ${item.color}`}
                      >
                        <item.icon size={20} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold">{item.title}</h3>
                        <p className="text-[11px] text-blue-200/70 uppercase">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Form - Main Content */}
            <div className="w-full lg:w-[68%] xl:w-[72%] bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10">
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="h-px bg-slate-100 w-full"></div>

                {/* 1 & 2. Info Sections */}
                <div className="grid md:grid-cols-2 gap-12">
                  {/* Donor Info */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-poppins text-slate-800 mb-6 flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-[16px] font-poppins text-white shadow-md shrink-0">
                        1
                      </span>
                      Personal Information
                    </h2>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500 block">
                        Full Name
                      </label>
                      <input
                        className={`w-full bg-slate-50 border-2 rounded-lg px-4 py-2.5 outline-none focus:bg-white focus:border-secondary transition-all font-inter font-medium text-sm ${errors.name ? "border-red-400 bg-red-50" : "border-slate-200"}`}
                        placeholder="Enter your full name"
                        value={donorData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                      />
                      <div className="h-5">
                        <p className="text-red-500 text-xs">{errors.name}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500 block">
                        Donor Type
                      </label>
                      <select
                        className="w-full w-full bg-slate-50 border-2 border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:bg-white focus:border-secondary transition-all font-inter font-medium text-sm placeholder:opacity-50"
                        onChange={(e) =>
                          handleChange("donorType", e.target.value)
                        }
                      >
                        <option value="">Select Donor Type</option>
                        <option value="individual">Individual</option>
                        <option value="corporate">Corporate / NGO</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500 block">
                        Email Address
                      </label>
                      <input
                        className={`w-full bg-slate-50 border-2 rounded-lg px-4 py-2.5 outline-none focus:bg-white focus:border-secondary transition-all font-inter font-medium text-sm placeholder:opacity-50 ${errors.email ? "border-red-400 bg-red-50" : "border-slate-200"}`}
                        placeholder="Enter Your Email Address"
                        value={donorData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        onBlur={() => handleBlur("email")}
                      />
                      <div className="h-5">
                        <p className="text-red-500 text-xs">{errors.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-500 block">
                          Phone Number
                        </label>
                        <input
                          className={`w-full bg-slate-50 border-2 rounded-lg px-4 py-2.5 outline-none focus:bg-white focus:border-secondary transition-all font-inter font-medium text-sm placeholder:opacity-50 ${errors.phone ? "border-red-400 bg-red-50" : "border-slate-200"}`}
                          placeholder="10-digit number"
                          value={donorData.phone}
                          onChange={(e) =>
                            handleChange("phone", e.target.value)
                          }
                          onBlur={() => handleBlur("phone")}
                        />
                        <div className="h-5">
                          <p className="text-red-500 text-xs">{errors.phone}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-500 block">
                          PAN Number
                        </label>
                        <input
                          className={`w-full bg-slate-50 border-2 px-4 py-2.5 rounded-lg outline-none focus:border-secondary uppercase font-inter font-medium text-sm ${errors.pan ? "border-red-400 bg-red-50" : "border-slate-200"}`}
                          placeholder="ABCDE1234F"
                          onChange={(e) => handleChange("pan", e.target.value)}
                        />
                        <div className="h-5">
                          <p className="text-red-500 text-xs">{errors.pan}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address Info */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-poppins text-slate-800 mb-6 flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-[16px] font-poppins text-white shadow-md shrink-0">
                        2
                      </span>
                      Address
                    </h2>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500 block">
                        Address Line 1
                      </label>
                      <input
                        className="w-full h-full bg-slate-50 border-2 border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:bg-white focus:border-secondary transition-all font-inter font-medium text-sm placeholder:opacity-50"
                        placeholder="Street Address"
                        onChange={(e) =>
                          handleChange("address1", e.target.value)
                        }
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-500 block">
                          City
                        </label>
                        <input
                          className="w-full w-full bg-slate-50 border-2 border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:bg-white focus:border-secondary transition-all font-inter font-medium text-sm placeholder:opacity-50"
                          placeholder="City"
                          onChange={(e) => handleChange("city", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-500 block">
                          Pincode
                        </label>
                        <input
                          className="w-full w-full bg-slate-50 border-2 border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:bg-white focus:border-secondary transition-all font-inter font-medium text-sm placeholder:opacity-50"
                          placeholder="Pincode"
                          onChange={(e) =>
                            handleChange("pincode", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500 block">
                        State
                      </label>
                      <select
                        className="w-full w-full bg-slate-50 border-2 border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:bg-white focus:border-secondary transition-all font-inter font-medium text-sm placeholder:opacity-50"
                        onChange={(e) => handleChange("state", e.target.value)}
                      >
                        <option value="">Select State</option>
                        <option value="MH">Maharashtra</option>
                        <option value="DL">Delhi</option>
                        <option value="KA">Karnataka</option>
                        <option value="GJ">Gujarat</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 3. Consents & Submit */}
                <section className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-[16px] font-bold text-white shadow-md shrink-0">
                      3
                    </span>
                    <h2 className="text-xl font-poppins text-slate-800">
                      Consent
                    </h2>
                  </div>
                  <div className="rounded-2xl bg-blue-50/50 p-6 border border-blue-100 space-y-4">
                    {[
                      "I would like to receive an official donation receipt",
                      "I request 80G certificate for tax exemption purposes",
                      "I consent to my name being used in public acknowledgments",
                    ].map((text, idx) => (
                      <label
                        key={idx}
                        className="flex items-center gap-4 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          className="w-5 h-5 rounded-md border-secondary text-secondary focus:ring-secondary transition-all"
                          defaultChecked
                        />
                        <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-700 transition-colors">
                          {text}
                        </span>
                      </label>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      window.open("https://razorpay.me/@yuvamitra", "_blank")
                    }
                    disabled={!isFormComplete || isSubmitting}
                    className={`mt-10 w-full sm:w-auto flex mx-auto items-center justify-center gap-4 bg-primary hover:bg-red-700 hover-bounce text-white font-bold px-7 py-2.5 rounded-full shadow-lg shadow-primary/20 transition-all active:scale-95 font-poppins ${!isFormComplete ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Proceed to donate
                  </button>
                  <p className="text-center text-slate-400 text-[11px] mt-6 font-medium">
                    By clicking "Proceed to donate", you agree to our Terms of
                    Service and Privacy Policy.
                  </p>
                </section>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
