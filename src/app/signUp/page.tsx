"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

interface User {
    email: string;
    password: string;
    username: string;
}


export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState<User>({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async (): Promise<void> => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            setUser({ email: "", password: "", username: "" });
            router.push("/login");
            
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Signup failed", error.message);
                toast.error(error.message);
            } else {
                console.log("Signup failed", "An unknown error occurred");
                toast.error("An unknown error occurred");
            }
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 p-4">
        <div className="bg-white/10 backdrop-blur-lg shadow-lg p-8 rounded-xl w-full max-w-md border border-gray-600">
            <h1 className="text-2xl font-bold text-white text-center mb-6">
                {loading ? "Processing..." : "Sign Up"}
            </h1>
            <hr className="border-gray-500 mb-4" />

            <div className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-gray-300 font-medium">User Name</label>
                    <input
                        className="w-full p-3 border border-gray-500 rounded-lg bg-gray-800 text-white focus:outline-none focus:border-blue-400 transition"
                        id="username"
                        type="text"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        placeholder="Enter username"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-gray-300 font-medium">Email</label>
                    <input
                        className="w-full p-3 border border-gray-500 rounded-lg bg-gray-800 text-white focus:outline-none focus:border-blue-400 transition"
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="Enter email"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-gray-300 font-medium">Password</label>
                    <input
                        className="w-full p-3 border border-gray-500 rounded-lg bg-gray-800 text-white focus:outline-none focus:border-blue-400 transition"
                        id="password"
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder="Enter password"
                    />
                </div>

                <button
                    onClick={onSignup}
                    disabled={buttonDisabled}
                    className={`w-full p-3 mt-2 rounded-lg text-white font-semibold transition ${
                        buttonDisabled ? "bg-gray-600 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                >
                    {loading ? "Processing..." : "Sign Up"}
                </button>

                <p className="text-gray-400 text-center mt-4">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-400 hover:underline">
                        Log in here
                    </Link>
                </p>
            </div>
        </div>
    </div>

    )

}