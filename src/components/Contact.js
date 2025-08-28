import React from "react";
import { useForm } from "react-hook-form";

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    alert("Thank you for contacting us!");
    reset();
  };

  return (
    <>

      {/* Hero Section */}
      <section className="h-[30vh] flex items-center justify-center bg-white">
        <h1 className="text-4xl sm:text-5xl font-bold text-green-800">
          Contact Us
        </h1>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-4 sm:px-16 max-w-3xl mx-auto bg-white">
        <p className="text-gray-700 text-lg sm:text-xl mb-8 text-center">
          We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 mt-1 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Message</label>
            <textarea
              rows="5"
              {...register("message", { required: "Message is required" })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${
                errors.message ? "border-red-500" : "border-gray-300"
              }`}
            ></textarea>
            {errors.message && (
              <p className="text-red-500 mt-1 text-sm">{errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white rounded-2xl font-semibold shadow-lg hover:bg-blue-600 hover:scale-105 transition-all duration-300"
          >
            Send Message
          </button>
        </form>
      </section>
    </>
  );
};

export default Contact;
