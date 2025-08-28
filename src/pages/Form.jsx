import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Form = ({ onSubmitSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Send form data to backend
      await axios.post("http://localhost:5000/api/checkout", data);

      alert("Checkout successfully!");

      if (onSubmitSuccess) onSubmitSuccess(); // clear cart
    } catch (err) {
      console.error("Error saving checkout:", err);
      alert("Failed to save checkout");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-2xl p-9 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Checkout Form
        </h2>

        <label className="block mb-1 text-gray-600">Name</label>
        <input
          type="text"
          {...register("Name", { required: "Name is required" })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.Name && <p className="text-red-500 text-sm mt-1">{errors.Name.message}</p>}

        <label className="block mt-4 mb-1 text-gray-600">Address</label>
        <textarea
          {...register("Address", { required: "Address is required" })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label className="block mt-4 mb-1 text-gray-600">Phone</label>
        <input
          type="text"
          {...register("Phone", {
            required: "Phone number is required",
            pattern: { value: /^[0-9]{10}$/, message: "Phone must be 10 digits" },
          })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.Phone && <p className="text-red-500 text-sm mt-1">{errors.Phone.message}</p>}

        <button
          type="submit"
          className="w-full mt-6 bg-green-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
