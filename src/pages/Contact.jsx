import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Heart,
  Building2,
} from "lucide-react";
import ContactBanner from "../components/layouts/Banners/ContactBanner.jsx";
import { FaMapMarkerAlt, FaPhoneAlt, FaBuilding } from "react-icons/fa";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address (e.g. name@domain.com)";
    }
    if (!formData.subject?.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitStatus(null);

      try {
        const response = await fetch(
          "http://localhost/yuva--public/api/contact.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          },
        );

        const result = await response.json();

        if (result.status === "success") {
          setSubmitStatus("success");
          setFormData({ name: "", email: "", subject: "", message: "" });
          setTimeout(() => setSubmitStatus(null), 5000);
        } else {
          setSubmitStatus("error");
        }
      } catch (error) {
        setSubmitStatus("error");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (field, value) => {
    let finalValue = value;
    if (field === "name") {
      finalValue = value.replace(/[0-9]/g, "");
    }

    setFormData({ ...formData, [field]: finalValue });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const handleBlur = (field) => {
    let newErrors = { ...errors };
    if (field === "email") {
      if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Enter a valid email address (e.g. name@domain.com)";
      } else if (!formData.email.trim()) {
        newErrors.email = "Email Address is required";
      }
    }
    setErrors(newErrors);
  };

  return (
    <div className="min-h-screen bg-white font-Inter text-slate-800">
      <ContactBanner />

      {/* 2. Floating Contact Section */}
      <section className="relative mt-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Form Card */}
          <div className="lg:col-span-7 bg-white rounded-xl shadow-2xl p-8 md:p-12 border border-slate-100">
            <h2 className="text-[32px] font-bold font-Poppins text-secondary mb-2">
              Send Us a Message
            </h2>
            <p className="text-slate-500 mb-8 font-medium">
              Have questions? We'd love to hear from you.
            </p>

            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-100 animate-in fade-in slide-in-from-top-2">
                Thank you! Your message has been sent successfully. We'll get
                back to you soon.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-100 animate-in fade-in slide-in-from-top-2">
                Oops! Something went wrong. Please try again or contact us
                directly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-500 mb-1 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    className={`w-full bg-slate-50 border-2 rounded-lg px-4 py-2.5 outline-none transition-all duration-300 font-medium text-sm placeholder:opacity-50 ${errors.name ? "border-red-400 focus:border-red-400" : "border-slate-200 focus:bg-white focus:border-secondary"}`}
                    placeholder="Enter your full name"
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                  <div className="h-5">
                    <p className="text-red-500 text-[11px] font-medium">
                      {errors.name}
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-500 mb-1 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    className={`w-full bg-slate-50 border-2 rounded-lg px-4 py-2.5 outline-none transition-all duration-300 font-medium text-sm placeholder:opacity-50 ${errors.email ? "border-red-400 focus:border-red-400" : "border-slate-200 focus:bg-white focus:border-secondary"}`}
                    placeholder="Enter Your Email Address"
                    onChange={(e) => handleChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                  />
                  <div className="h-5">
                    <p className="text-red-500 text-[11px] font-medium">
                      {errors.email}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-500 mb-1 block">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  className={`w-full bg-slate-50 border-2 rounded-lg px-4 py-2.5 outline-none transition-all duration-300 font-medium text-sm placeholder:opacity-50 ${errors.subject ? "border-red-400 focus:border-red-400" : "border-slate-200 focus:bg-white focus:border-secondary"}`}
                  placeholder="How can we help?"
                  onChange={(e) => handleChange("subject", e.target.value)}
                />
                <div className="h-5">
                  {errors.subject && (
                    <p className="text-red-500 text-xs">{errors.subject}</p>
                  )}
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-500 mb-1 block">
                  Message
                </label>
                <textarea
                  rows="5"
                  value={formData.message}
                  className={`w-full bg-slate-50 border-2 rounded-lg px-4 py-2.5 outline-none transition-all duration-300 font-medium text-sm placeholder:opacity-50 ${errors.message ? "border-red-400 focus:border-red-400" : "border-slate-200 focus:bg-white focus:border-secondary"}`}
                  placeholder="Your message here..."
                  onChange={(e) => handleChange("message", e.target.value)}
                ></textarea>
                <div className="h-5">
                  {errors.message && (
                    <p className="text-red-500 text-xs">{errors.message}</p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 bg-primary hover:bg-red-700 hover-bounce text-white font-bold px-7 py-2.5 rounded-full shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed text-base group"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>Send Message</>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F8FAFC] rounded-xl p-8 border border-slate-100 group hover:border-[#2E3192] transition-colors">
              <div className="flex gap-4 items-start">
                <div className="bg-secondary p-3 rounded-lg text-white shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-bold font-Poppins text-xl mb-1">
                    Our Location
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Mitrangan Campus, Ghoti – Sinnar Highway, Harsule Shivar,
                    Lonarwadi, Pincode- 422103 Taluka-Sinnar, District- Nashik.
                    Maharashtra, India.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              <div className="bg-[#F8FAFC] rounded-xl p-6 border border-slate-100 flex items-center gap-4">
                <div className="bg-[#ED1C24] p-3 rounded-lg text-white">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-[16px] font-bold font-poppins">Call Us</p>
                  <a
                    href="tel:+919527402400"
                    className="text-slate-800 hover:text-primary transition-colors"
                  >
                    +91 9527402400
                  </a>
                </div>
              </div>

              <div className="bg-[#F8FAFC] rounded-xl p-6 border border-slate-100 flex items-center gap-4">
                <div className="bg-primary p-3 rounded-lg text-white">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-[16px] font-bold font-Poppins">Email Us</p>
                  <a
                    href="mailto:admin@yuvamitra.org"
                    className=" text-slate-800 hover:text-primary transition-colors"
                  >
                    admin@yuvamitra.org
                  </a>
                </div>
              </div>
            </div>

            {/* Google Map Placeholder */}
            <div className="h-64 bg-slate-200 rounded-xl overflow-hidden shadow-inner relative">
              <iframe
                title="map"
                src="https://maps.google.com/maps?q=Mitrangan%20Campus%2C%20Ghoti&z=13&output=embed"
                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-[1380px] mx-auto px-6">
          <div className="mb-6 md:mb-10 text-center">
            <h2 className="text-[32px] md:text-[32px] font-bold font-Poppins text-secondary mb-2 ">
              Our <span className="text-primary">Offices</span>
            </h2>
            {/* <div className="flex items-center justify-center gap-1.5">
            <div className="h-0.5 w-8 bg-primary" />
            <div className="h-0.5 w-1.5 bg-white/20" />
          </div> */}
            <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-accent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card */}
            {[
              {
                title: "Dhadgaon, Nandurbar",
                phone: "+91 75076 98940",
                address:
                  "Behind New Tahasil office, Rohajari Pada, Dhadgaon, Nandurbar, Pin- 425414",
              },
              {
                title: "Akkalkuwa, Nandurbar",
                phone: "+91 75076 98940",
                address:
                  "Kuber Park, Behind Police Station, Akkalkuwa, Nandurbar, Pin- 425415",
              },
              {
                title: "Khed, Pune",
                phone: "+91 95116 47948",
                address:
                  "2nd Floor, Radhanagari Complex, Pabal Road, Rajgurunagar (Khed), Pune. Pin. 410505",
              },
              {
                title: "Mahad, Raigad",
                phone: "+91 78989 97779",
                address:
                  "4th Floor, Surekha Nivas, Beside Bank Of India, Ch. Shivaji Maharaj Chowk, Kakartale, Mahad, Raigad, Pin- 402301",
              },
            ].map((office, index) => (
              <div key={index} className="group [perspective:1000px]">
                <div className="relative h-64 w-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* FRONT */}
                  <div className="absolute inset-0 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center p-6 text-center backface-hidden border border-slate-200 transition-all duration-300">
                    <div className="bg-primary text-white p-4 rounded-full mb-4 shadow-md group-hover:scale-110 transition-transform duration-300">
                      <FaBuilding size={22} />
                    </div>

                    <h3 className="text-[16px] font-semibold font-Poppins text-slate-800 leading-snug">
                      {office.title} Office
                    </h3>
                  </div>

                  {/* BACK */}
                  <div className="absolute inset-0 bg-secondary text-white rounded-xl shadow-lg p-6 flex flex-col justify-center text-center [transform:rotateY(180deg)] backface-hidden border border-white/20">
                    <div className="flex items-start gap-2 mb-3 justify-center">
                      <FaMapMarkerAlt
                        size={16}
                        className="mt-1 text-primary shrink-0"
                      />
                      <p className="text-sm leading-relaxed">
                        {office.address}
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-2 font-semibold mt-2">
                      <FaPhoneAlt size={14} className="text-primary" />
                      <a href={`tel:${office.phone}`}>{office.phone}</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
