"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/utils/validation";
import { useState, useEffect, useRef } from "react";

export default function RegisterForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(userSchema),
  });

  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference for file input

  const onSubmit = async (data: any) => {
    setLoading(true);
    setMessage("");
  
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone);
    formData.append("message", data.message);
    if (file) formData.append("fileUrl", file);
  
    const response = await fetch("/api/register", {
      method: "POST",
      body: formData,
    });
  
    const result = await response.json();
    setLoading(false);
  
    if (response.ok) {
      setMessage("User registered successfully! ✅");
      reset(); // ✅ Form fields reset hoga
      setFile(null); // ✅ File state reset hoga
      if (fileInputRef.current) fileInputRef.current.value = ""; // ✅ File input clear hoga
    } else {
      setMessage(result.error || "Something went wrong! ❌");
    }
  };
  
  

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <div className="flex flex-col">
          <label className="font-medium">Name</label>
          <input 
            {...register("name")} 
            placeholder="Enter your name"
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Email</label>
          <input 
            type="email" 
            {...register("email")} 
            placeholder="Enter your email"
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Password</label>
          <input 
            type="password" 
            {...register("password")} 
            placeholder="Create a password"
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Phone Number</label>
          <input 
            type="text" 
            {...register("phone")} 
            placeholder="Enter your phone number"
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Message</label>
          <textarea 
            {...register("message")} 
            placeholder="Write a message (optional)"
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Upload Resume (PDF)</label>
          <input 
            ref={fileInputRef}
            type="file" 
            accept=".pdf" 
            onChange={(e) => setFile(e.target.files?.[0] || null)} 
            className="w-full border p-2 rounded-md bg-gray-50"
          />
          {file && <p className="text-green-600 text-sm">File Selected: {file.name}</p>}
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-3 rounded-md font-semibold hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {message && (
        <p className={`mt-4 text-center font-medium ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
