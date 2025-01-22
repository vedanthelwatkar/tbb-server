import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  bookSelector,
  configurationSelector,
  contactsSelector,
} from "../redux/selector/selector";
import { bookAppointments, resetBooking } from "../redux/slice/BookSlice";

const Book = ({ sectionRefs }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { contactsData } = useSelector(contactsSelector);
  const { configurationData } = useSelector(configurationSelector);
  const { appointmentSuccess, appointmentError, appointmentLoading } =
    useSelector(bookSelector);
  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone is required";
    } else if (!/^[0-9]{10}$/i.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }
    if (!formData.date) newErrors.date = "Date is required";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "phone") {
      setFormData((prev) => ({
        ...prev,
        [name]: Number(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    if (appointmentSuccess) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
      });
    }
    setIsSubmitting(appointmentLoading);
  }, [appointmentSuccess, appointmentError, appointmentLoading]);

  return (
    <section
      ref={sectionRefs?.contact}
      className="pt-12 pb-28 bg-gradient-to-t from-[#DCF7D4] to-white"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center md:space-x-12 space-y-12 md:space-y-0">
          <div className="w-full md:w-1/2 max-w-md mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-center text-primary mb-8">
              Contact Us
            </h2>
            <div className="p-6 flex rounded-lg bg-white shadow-lg">
              <div className="flex flex-col my-2 text-start gap-2">
                <p className="text-primary">{contactsData.name}</p>
                <p className="text-primary">{`Email: ${contactsData.email}`}</p>
                <p className="text-primary">{`Phone: ${contactsData.phone}`}</p>
                <p className="text-primary">Address: {contactsData.address}</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-semibold text-center text-primary mb-8">
              Book an Appointment
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-primary font-medium">
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
                  <label className="block text-primary font-medium">
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
                  <label className="block text-primary font-medium">
                    Your Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-md border ${
                      errors.phone ? "border-red-500" : "border-[#8DB45C]"
                    } focus:outline-none focus:ring-2 focus:ring-[#0D530B]`}
                    placeholder="1234567890"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-primary font-medium">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    className={`w-full px-4 py-2 rounded-md border ${
                      errors.date ? "border-red-500" : "border-[#8DB45C]"
                    } focus:outline-none focus:ring-2 focus:ring-[#0D530B]`}
                  />
                  {errors.date && (
                    <p className="text-red-500 text-sm">{errors.date}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0D530B] hover:bg-[#8DB45C] text-white py-2 px-4 rounded-md transition-colors duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? "Booking..." : "Book Now"}
                </button>

                {appointmentSuccess && (
                  <div className="text-green-500 text-sm mt-2">
                    Appointment booked successfully!
                  </div>
                )}

                {appointmentError && appointmentError.error && (
                  <div className="text-red-500 text-sm mt-2">
                    {appointmentError.error}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Book;
