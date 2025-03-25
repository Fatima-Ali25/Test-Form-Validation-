"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
       
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);



    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/home");
        } catch (error: unknown) {
            if (error instanceof Error) {
        console.log("Login error:", error.message);
    }
        } finally{
        setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user]);

    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-white text-center">
          {loading ? "Processing..." : "Login"}
        </h1>
        <hr className="my-4 border-gray-300" />

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-white font-medium">
            Email
          </label>
          <input
            className="w-full p-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter your email"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-white font-medium">
            Password
          </label>
          <input
            className="w-full p-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter your password"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={onLogin}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md transition duration-300 transform hover:scale-105 hover:shadow-lg"
          disabled={buttonDisabled}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup Link */}
        <p className="text-white text-center mt-4">
        Don&apos;t forget to check your email.
          <Link
            href="/signUp"
            className="underline text-blue-200 hover:text-white transition duration-200"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
    )

}