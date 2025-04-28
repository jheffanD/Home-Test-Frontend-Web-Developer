"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Link from "next/link";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!username) newErrors.username = "Please enter your username";
    if (!password) newErrors.password = "Please enter your password";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Login sukses!");
    }
  };

  return (
    <main className="w-full min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <section className="bg-white text-slate-900 w-full max-w-sm rounded-lg border-2 shadow-md p-8 flex flex-col gap-6">
        {/* Logo */}
        <div className="flex justify-center">
          <Image src="/img/Frame.png" alt="Logo" width={134} height={24} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-sm">
          {/* Username */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold ml-1">Username</label>
            <Input
              className="w-full"
              placeholder="Input username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <p className="text-red-500 text-xs pl-1">{errors.username}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1 relative">
            <label className="font-semibold ml-1">Password</label>
            <Input
              className="w-full pr-10"
              type={showPassword ? "text" : "password"}
              placeholder="Input password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              onClick={togglePassword}
              className="absolute right-3 top-9 cursor-pointer text-gray-500"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs pl-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Login
          </Button>
        </form>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </section>
    </main>
  );
}
