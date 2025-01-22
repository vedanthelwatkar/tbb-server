import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { useDispatch, useSelector } from "react-redux";
import {
  bookSelector,
  configurationSelector,
  contactsSelector,
} from "@/redux/selector/selector";
import { bookAppointments, resetBooking } from "@/redux/slice/BookSlice";

const Book = ({ sectionRefs }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { contactsData } = useSelector(contactsSelector);
  const { configurationData } = useSelector(configurationSelector);
  const { appointmentSuccess, appointmentError, appointmentLoading } =
    useSelector(bookSelector);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    dispatch(resetBooking());
    dispatch(bookAppointments(data));
  };

  useEffect(() => {
    if (appointmentSuccess) {
      reset();
    }
    setIsSubmitting(appointmentLoading);
  }, [appointmentSuccess, appointmentError, appointmentLoading, reset]);

  return (
    <section
      ref={sectionRefs?.book}
      className="pt-12 pb-28 bg-gradient-to-t from-tertiary to-background "
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center md:space-x-12 space-y-12 md:space-y-0">
          <div className="w-full md:w-1/2">
            <TextGenerateEffect
              words="Book an Appointment"
              className="text-3xl md:text-4xl font-semibold text-center text-textBase mb-8"
            />
            <div className="bg-white p-6 rounded-lg shadow-md">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: "Name is required" }}
                    render={({ field }) => (
                      <Input
                        id="name"
                        placeholder="John Doe"
                        {...field}
                        className={cn(errors.name && "border-red-500")}
                      />
                    )}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Your Email</Label>
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        {...field}
                        className={cn(errors.email && "border-red-500")}
                      />
                    )}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Your Phone</Label>
                  <Controller
                    name="phone"
                    control={control}
                    rules={{
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Invalid phone number",
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="1234567890"
                        {...field}
                        className={cn(errors.phone && "border-red-500")}
                      />
                    )}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Preferred Date</Label>
                  <Controller
                    name="date"
                    control={control}
                    rules={{ required: "Date is required" }}
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground",
                              errors.date && "border-red-500"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date() ||
                              date >
                                new Date(
                                  new Date().setMonth(new Date().getMonth() + 2)
                                )
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                  {errors.date && (
                    <p className="text-red-500 text-sm">
                      {errors.date.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary text-white hover:bg-secondary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Booking..." : "Book Now"}
                </Button>

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
          <div className="w-full md:w-1/2 max-w-md mx-auto">
            <TextGenerateEffect
              words="Contact Us"
              className="text-3xl md:text-4xl font-semibold text-center text-textBase mb-8"
            />
            <div className="p-6 rounded-lg">
              <p className="text-center text-textSecondary mb-8">
                {configurationData?.contact &&
                  configurationData?.contact[0]?.description}
              </p>
              <div className="my-2 text-center">
                <p className="text-textBase">{contactsData.name}</p>
                <p className="text-textBase">{`Email: ${contactsData.email}`}</p>
                <p className="text-textBase">{`Phone: ${contactsData.phone}`}</p>
                <p className="text-textBase">{contactsData.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Book;
