"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation checks
    if (!username) newErrors.username = "Username field cannot be empty";
    if (!password) newErrors.password = "Password field cannot be empty";
    if (password && password.length < 8)
      newErrors.password = "Password must be at least 8 characters long";

    if (!role) newErrors.role = "Please select a role";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted successfully!");
      // Add the logic for submitting the form here.
    }
  };

  return (
    <main>
      <section className="w-full min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        {/* Root container */}
        <div className="bg-white text-slate-900 w-full max-w-[400px] h-auto flex flex-col text-center rounded-lg justify-center border-2 p-6">
          <section className="flex justify-center mb-6">
            <Image src={"/img/Frame.png"} alt="Logo" width={134} height={24} />
          </section>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col text-sm text-slate-900"
          >
            {/* Username */}
            <div className="flex flex-col items-start gap-2 mb-4">
              <label className="w-full text-left ml-7 font-semibold">
                Username
              </label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full sm:w-[368px]"
                placeholder="Input username"
              />
              {errors.username && (
                <p className="text-red-500 text-xs w-full text-left pl-5">
                  {errors.username}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col items-start gap-2 mb-4 relative">
              <label className="w-full text-left ml-7 font-semibold">
                Password
              </label>
              <Input
                className="w-full sm:w-[368px] pr-10"
                type={showPassword ? "text" : "password"}
                placeholder="Input password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                onClick={togglePassword}
                className="absolute right-8 top-9 cursor-pointer text-gray-500"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs w-full text-left pl-5">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Role Selection */}
            <div className="flex flex-col items-start gap-2 mb-4">
              <label className="w-full text-left ml-7 font-semibold">
                Role
              </label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="w-full sm:w-[368px]">
                  <SelectValue placeholder="Select Your Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-red-500 text-xs w-full text-left pl-5">
                  {errors.role}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex flex-col items-center gap-2 mb-4">
              <Button
                type="submit"
                className="w-full sm:w-[368px] bg-blue-600 text-white"
              >
                Register
              </Button>
            </div>
          </form>

          {/* Link to Login */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link href="/Login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
