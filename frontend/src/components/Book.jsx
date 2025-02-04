import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { bookSelector, contactsSelector } from "../redux/selector/selector";
import { bookAppointments, resetBooking } from "../redux/slice/BookSlice";
import { ArrowRight } from "lucide-react";

const Book = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
  });
  const [errors, setErrors] = useState({});

  const { contactsData } = useSelector(contactsSelector);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { appointmentSuccess, appointmentError, appointmentLoading } =
    useSelector(bookSelector);
  const dispatch = useDispatch();

  const disableNonMonTueDates = (e) => {
    const day = new Date(e.target.value).getDay();
    if (day !== 1 && day !== 2) {
      e.target.value = "";
      toast.error("Please select only Monday or Tuesday", {
        position: "top-center",
        autoClose: 3000,
      });
    }
    handleChange(e);
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 11; hour <= 17; hour++) {
      const time = `${hour.toString().padStart(2, "0")}:00`;
      slots.push(time);
    }
    return slots;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name?.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.date) {
      newErrors.date = "Preferred date is required";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.length > 15) {
      newErrors.phone = "Phone number is too long";
    } else if (formData.phone.length < 8) {
      newErrors.phone = "Phone number is too short";
    }

    if (!formData.time) {
      newErrors.time = "Preferred time is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(resetBooking());
      dispatch(bookAppointments(formData));
    }
  };

  useEffect(() => {
    setIsSubmitting(appointmentLoading);
  }, [appointmentLoading]);

  useEffect(() => {
    if (appointmentSuccess) {
      toast.success("Appointment booked successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
      });
    }

    if (appointmentError) {
      toast.error(
        appointmentError.error || "Booking failed. Please try again.",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    }

    dispatch(resetBooking());
  }, [appointmentSuccess, appointmentError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      phone: value || "",
    }));
  };

  return (
    <section className="pt-12 pb-28 bg-gradient-to-t from-tertiary to-background">
      <ToastContainer />
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center md:space-x-12 space-y-12 md:space-y-0">
          <div className="w-full md:w-1/2 max-w-md mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-center text-primary mb-8 animate-text-blur">
              Contact Us
            </h2>
            <div className="p-6 flex rounded-lg bg-white shadow-lg">
              <div className="flex flex-col my-2 text-start gap-2">
                <p className="text-primary animate-text-blur-1">
                  {contactsData.name}
                </p>
                <p className="text-primary animate-text-blur-1">{`Email: ${contactsData.email}`}</p>
                <p className="text-primary animate-text-blur-1">{`Phone: ${contactsData.phone}`}</p>
                <p className="text-primary animate-text-blur-1">
                  Address: {contactsData.address}
                </p>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-primary animate-text-blur-1 italic">
                    "Empowering minds, one conversation at a time."
                  </p>
                </div>
                <div className="mt-2">
                  <a
                    href="https://www.psychologytoday.com/au/counselling/priya-rajan-dover-gardens-sa/1164415"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-textSecondary hover:text-blue-500 hover:underline flex items-center transition-colors duration-200"
                  >
                    <span>View on Psychology Today</span>
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-semibold text-center text-primary mb-8 animate-text-blur">
              Book an Appointment
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-primary font-medium animate-text-blur-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-md border ${
                      errors.name ? "border-red-500" : "border-[#8DB45C]"
                    } focus:outline-none focus:ring-2 focus:ring-[#0D530B]`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-primary font-medium animate-text-blur-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-md border ${
                      errors.email ? "border-red-500" : "border-[#8DB45C]"
                    } focus:outline-none focus:ring-2 focus:ring-[#0D530B]`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-primary font-medium animate-text-blur-1">
                    Your Phone
                  </label>
                  <div
                    className={`relative ${
                      errors.phone ? "border-red-500" : "border-[#8DB45C]"
                    } border rounded-md focus-within:ring-2 focus-within:ring-[#0D530B] px-4 py-2`}
                  >
                    <PhoneInput
                      international
                      countryCallingCodeEditable={false}
                      defaultCountry="AU"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className="w-full"
                      inputClassName="w-full px-4 py-2 rounded-md border-none focus:outline-none"
                      placeholder="Enter phone number"
                      withCountryCallingCode={true}
                      flags={true}
                      onCountryChange={(country) => {
                        if (country === " ") {
                          handlePhoneChange("+61");
                        }
                      }}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-primary font-medium animate-text-blur-1">
                    Preferred Date (Monday/Tuesday only)
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={disableNonMonTueDates}
                    min={new Date().toISOString().split("T")[0]}
                    className={`w-full px-4 py-2 rounded-md border ${
                      errors.date ? "border-red-500" : "border-[#8DB45C]"
                    } focus:outline-none focus:ring-2 focus:ring-[#0D530B]`}
                  />
                  {errors.date && (
                    <p className="text-red-500 text-sm">{errors.date}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-primary font-medium animate-text-blur-1">
                    Preferred Time (ACDT)
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, time: e.target.value }))
                    }
                    className={`w-full px-4 py-2 rounded-md border ${
                      errors.time ? "border-red-500" : "border-[#8DB45C]"
                    } focus:outline-none focus:ring-2 focus:ring-[#0D530B]`}
                  >
                    <option value="">Select a time</option>
                    {generateTimeSlots().map((time) => (
                      <option key={time} value={time}>
                        {time} -{" "}
                        {time === "17:00"
                          ? "17:50"
                          : `${Number.parseInt(time) + 1}:50`}{" "}
                        ACDT
                      </option>
                    ))}
                  </select>
                  {errors.time && (
                    <p className="text-red-500 text-sm">{errors.time}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || appointmentLoading}
                  className="w-full bg-[#0D530B] hover:bg-[#8DB45C] text-white py-2 px-4 rounded-md transition-colors duration-300 disabled:opacity-50"
                >
                  {isSubmitting || appointmentLoading
                    ? "Booking..."
                    : "Book Now"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Book;
