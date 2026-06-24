import React, { useState } from "react";
import CareerBanner from "../components/layouts/Banners/CareerBanner";
import {
  Briefcase,
  GraduationCap,
  Upload,
  Send,
  User,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  MapPin,
  HeartHandshake,
} from "lucide-react";

export default function Careers() {
  const [activeTab, setActiveTab] = useState("job");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    experience: "",
    institute: "",
    qualification: "",
    position: "",
    city: "",
    resume: null,
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
    const phoneClean = formData.phone.replace(/[\s\-\(\)]/g, "");
    if (!phoneClean) {
      newErrors.phone = "Phone Number is required";
    } else if (phoneClean.length !== 10) {
      newErrors.phone = "Mobile number must be 10 digits.";
    } else if (!/^[789]/.test(phoneClean)) {
      newErrors.phone = "Mobile number must start with 7, 8, or 9.";
    }
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.experience)
      newErrors.experience = "Experience level is required";
    if (!formData.institute.trim())
      newErrors.institute = "Institute name is required";
    if (!formData.qualification.trim())
      newErrors.qualification = "Qualification is required";
    if (!formData.position) newErrors.position = "Please select a position";
    if (!formData.city.trim()) newErrors.city = "Current City is required";
    if (!formData.resume) newErrors.resume = "Please upload your resume";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          dob: "",
          experience: "",
          institute: "",
          qualification: "",
          position: "",
          city: "",
          resume: null,
        });
        setTimeout(() => setSubmitStatus(null), 5000);
      }, 1500);
    }
  };

  const handleChange = (field, value) => {
    let finalValue = value;
    if (field === "name") {
      finalValue = value.replace(/[0-9]/g, "");
    } else if (field === "phone") {
      finalValue = value.replace(/[^0-9]/g, "").slice(0, 10);
    }

    setFormData({ ...formData, [field]: finalValue });

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
      const phoneClean = formData.phone.replace(/[\s\-\(\)]/g, "");
      if (
        phoneClean.length > 0 &&
        phoneClean.length < 10 &&
        /^[789]/.test(phoneClean)
      ) {
        newErrors.phone = "Mobile number must be 10 digits.";
      }
    } else if (field === "email") {
      if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Enter a valid email address (e.g. name@domain.com)";
      } else if (!formData.email.trim()) {
        newErrors.email = "Email Address is required";
      }
    }
    setErrors(newErrors);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setErrors({ ...errors, resume: "File size must be less than 5MB" });
        return;
      }
      setFormData({ ...formData, resume: file });
      setErrors({ ...errors, resume: null });
    }
  };

  return (
    <div className="bg-slate-50 font-Inter">
      <CareerBanner />

      <div className="max-w-[1380px] mx-auto px-6 py-2 lg:px-12 mt-12 relative z-10 ">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
          <div className="grid lg:grid-cols-12">
            {/* Sidebar Information */}
            <div className="lg:col-span-4 bg-[#0f1f5c] p-10 text-white flex flex-col justify-between relative overflow-hidden">
              {/* Decorative background element */}
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />

              <div className="relative z-10">
                <h2 className="text-[32px] font-black font-Poppins mb-6 leading-tight">
                  Build Your Future With Us.
                </h2>
                <p className="text-blue-100/70 mb-10 leading-relaxed font-medium">
                  Yuva Mitra is a place where passion meets purpose. Join a
                  community dedicated to creating sustainable impact across
                  rural India.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-white/5 p-5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <User className="text-blue-300" size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold">Inclusive Culture</h3>
                      <p className="text-[10px] text-blue-200/50 mt-1">
                        Growth for everyone
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white/5 p-5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Briefcase className="text-emerald-300" size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold">Meaningful Work</h3>
                      <p className="text-[10px] text-blue-200/50 mt-1">
                        Direct Social Impact
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white/5 p-5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                    <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="text-violet-300" size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold">Learning & Growth</h3>
                      <p className="text-[10px] text-blue-200/50 mt-1">
                        Continuous development
                      </p>
                    </div>
                  </div>
                  {/* <div className="flex items-center gap-4 bg-white/5 p-5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                     <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                       <MapPin className="text-amber-300" size={20} />
                     </div>
                     <div>
                       <h3 className="text-sm font-bold">Rural Outreach</h3>
                       <p className="text-[10px] text-blue-200/50 mt-1">Work across India</p>
                     </div>
                   </div> */}
                  {/* <div className="flex items-center gap-4 bg-white/5 p-5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                     <div className="w-12 h-12 bg-rose-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                       <HeartHandshake className="text-rose-300" size={20} />
                     </div>
                     <div>
                       <h3 className="text-sm font-bold">Community First</h3>
                       <p className="text-[10px] text-blue-200/50 mt-1">People-centered mission</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-4 bg-white/5 p-5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                     <div className="w-12 h-12 bg-sky-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                       <BookOpen className="text-sky-300" size={20} />
                     </div>
                     <div>
                       <h3 className="text-sm font-bold">Knowledge Sharing</h3>
                       <p className="text-[10px] text-blue-200/50 mt-1">Learn from the field</p>
                     </div>
                   </div> */}
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="lg:col-span-8 p-8 md:p-14 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[5rem] -z-10" />

              {submitStatus === "success" && (
                <div className="mb-8 p-4 bg-green-50 text-green-700 rounded-xl border border-green-100 animate-in fade-in slide-in-from-top-4 duration-700">
                  <p className="font-bold">Application Submitted!</p>
                  <p className="text-sm">
                    Thank you for applying. Our HR team will review your profile
                    and contact you soon.
                  </p>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-6 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500 block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      placeholder="Enter Your Name"
                      className={`w-full bg-slate-50 border-2 rounded-lg px-4 py-2.5 outline-none transition-all duration-300 font-medium text-sm placeholder:opacity-50 ${errors.name ? "border-red-400 focus:border-red-400" : "border-transparent focus:bg-white focus:border-secondary"}`}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                    <div className="h-5">
                      {errors.name && (
                        <p className="text-red-500 text-xs">{errors.name}</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500 block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      placeholder="Enter Your Email"
                      className={`w-full bg-slate-50 border-2 rounded-lg px-4 py-2.5 outline-none transition-all duration-300 font-medium text-sm placeholder:opacity-50 ${errors.email ? "border-red-400 focus:border-red-400" : "border-transparent focus:bg-white focus:border-secondary"}`}
                      onChange={(e) => handleChange("email", e.target.value)}
                      onBlur={() => handleBlur("email")}
                    />
                    <div className="h-5">
                      {errors.email && (
                        <p className="text-red-500 text-xs">{errors.email}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500 block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      placeholder="Enter Phone Number"
                      className={`w-full bg-slate-50 border-2 rounded-lg px-4 py-2.5 outline-none transition-all duration-300 font-medium text-sm placeholder:opacity-50 ${errors.phone ? "border-red-400 focus:border-red-400" : "border-transparent focus:bg-white focus:border-secondary"}`}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      onBlur={() => handleBlur("phone")}
                    />
                    <div className="h-5">
                      {errors.phone && (
                        <p className="text-red-500 text-xs">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500 block mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={formData.dob}
                      className={`w-full bg-slate-50 border-2 rounded-lg px-4 py-2.5 outline-none transition-all duration-300 font-medium text-sm placeholder:opacity-50 ${errors.dob ? "border-red-400 focus:border-red-400" : "border-transparent focus:bg-white focus:border-secondary"}`}
                      onChange={(e) => handleChange("dob", e.target.value)}
                    />
                    <div className="h-5">
                      {errors.dob && (
                        <p className="text-red-500 text-xs">{errors.dob}</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500 block mb-1">
                      Experience
                    </label>
                    <select
                      value={formData.experience}
                      className={`w-full bg-slate-50 border-2 rounded-lg px-4 py-2.5 outline-none transition-all duration-300 font-medium text-sm text-slate-600 ${errors.experience ? "border-red-400 focus:border-red-400" : "border-transparent focus:bg-white focus:border-secondary"}`}
                      onChange={(e) =>
                        handleChange("experience", e.target.value)
                      }
                    >
                      <option value="">Select Experience</option>
                      <option value="0">Fresher</option>
                      <option value="1-2">1-2 Years</option>
                      <option value="3-5">3-5 Years</option>
                      <option value="5+">5+ Years</option>
                    </select>
                    <div className="h-5">
                      {errors.experience && (
                        <p className="text-red-500 text-xs">
                          {errors.experience}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500 block mb-1">
                      Institute of Education
                    </label>
                    <input
                      type="text"
                      value={formData.institute}
                      placeholder="Your College / University"
                      className={`w-full bg-slate-50 border-2 rounded-lg px-4 py-2.5 outline-none transition-all duration-300 font-medium text-sm placeholder:opacity-50 ${errors.institute ? "border-red-400 focus:border-red-400" : "border-transparent focus:bg-white focus:border-secondary"}`}
                      onChange={(e) =>
                        handleChange("institute", e.target.value)
                      }
                    />
                    <div className="h-5">
                      {errors.institute && (
                        <p className="text-red-500 text-xs">
                          {errors.institute}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500 block mb-1">
                      Latest Qualification
                    </label>
                    <input
                      type="text"
                      value={formData.qualification}
                      placeholder="e.g. MBA in Social Work"
                      className={`w-full bg-slate-50 border-2 rounded-lg px-4 py-2.5 outline-none transition-all duration-300 font-medium text-sm placeholder:opacity-50 ${errors.qualification ? "border-red-400 focus:border-red-400" : "border-transparent focus:bg-white focus:border-secondary"}`}
                      onChange={(e) =>
                        handleChange("qualification", e.target.value)
                      }
                    />
                    <div className="h-5">
                      {errors.qualification && (
                        <p className="text-red-500 text-xs">
                          {errors.qualification}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500 block mb-1">
                      Applying for
                    </label>
                    <select
                      value={formData.position}
                      className={`w-full bg-slate-50 border-2 rounded-lg px-4 py-2.5 outline-none transition-all duration-300 font-medium text-sm text-slate-600 ${errors.position ? "border-red-400 focus:border-red-400" : "border-transparent focus:bg-white focus:border-secondary"}`}
                      onChange={(e) => handleChange("position", e.target.value)}
                    >
                      <option value="">Select Position</option>
                      <option value="intern">Internship</option>
                      <option value="volunteer">Volunteer</option>
                      <option value="fulltime">Full-Time Job</option>
                    </select>
                    <div className="h-5">
                      {errors.position && (
                        <p className="text-red-500 text-xs">
                          {errors.position}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500 block mb-1">
                      Current City
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      placeholder="e.g. Nashik, Maharashtra"
                      className={`w-full bg-slate-50 border-2 rounded-lg px-4 py-2.5 outline-none transition-all duration-300 font-medium text-sm placeholder:opacity-50 ${errors.city ? "border-red-400 focus:border-red-400" : "border-transparent focus:bg-white focus:border-secondary"}`}
                      onChange={(e) => handleChange("city", e.target.value)}
                    />
                    <div className="h-5">
                      {errors.city && (
                        <p className="text-red-500 text-xs">{errors.city}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500 block mb-1">
                    Upload Resume (PDF / DOC)
                  </label>
                  <div className="relative group/file overflow-hidden">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      onChange={handleFileChange}
                    />
                    <div
                      className={`w-full bg-slate-50 border-2 border-dashed rounded-lg px-6 py-5 flex items-center justify-between transition-all duration-300 ${errors.resume ? "border-red-400 bg-red-50" : "border-slate-200 group-hover/file:border-secondary group-hover/file:bg-blue-50"}`}
                    >
                      <span
                        className={`text-[16px] font-medium ${errors.resume ? "text-red-500" : formData.resume ? "text-secondary" : "text-slate-400"}`}
                      >
                        {formData.resume
                          ? formData.resume.name
                          : "Choose file or drag & drop"}
                      </span>
                      <div
                        className={`flex items-center gap-3 ${errors.resume ? "text-red-500" : "text-slate-500 group-hover/file:text-secondary"}`}
                      >
                        <Upload
                          size={20}
                          className={formData.resume ? "" : "animate-bounce"}
                        />
                        <span className="text-[16px] font-Poppins font-bold">
                          {formData.resume ? "File Added" : "Browse File"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="h-5">
                    {errors.resume && (
                      <p className="text-red-500 text-xs">{errors.resume}</p>
                    )}
                  </div>
                </div>

                <div className="pt-4 flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-3 bg-primary hover:bg-red-700 hover-bounce text-white font-bold px-7 py-2.5 rounded-full shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        {/* <Send size={16} /> */}
                        Submit Application
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
