"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!username) newErrors.username = "Please enter your username";
    if (!password) newErrors.password = "Please enter your password";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const result = await signIn("credentials", {
        redirect: false,
        username,
        password,
        callbackUrl: "/",
      });

      if (result?.ok) {
        window.location.href = result.url || "/";
      } else {
        setErrors({ form: "Invalid username or password" });
      }
    }
  };

  return (
    <main>
      <section className="w-full min-h-screen bg-gray-100 flex flex-col items-center justify-center py-8 px-4">
        <div className="bg-white text-slate-900 w-full max-w-[400px] h-auto flex flex-col text-center rounded-lg justify-center border-2 p-6">
          <section className="flex justify-center mb-6">
            <Image src={"/img/Frame.png"} alt="Logo" width={134} height={24} />
          </section>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col text-sm text-slate-900"
          >
            {errors.form && (
              <p className="text-red-500 text-xs text-center">{errors.form}</p>
            )}

            {/* Username */}
            <div className="flex flex-col items-start gap-2 mb-4">
              <label className="w-full text-left ml-7 font-semibold">
                Username
              </label>
              <Input
                className="w-full sm:w-[368px]"
                placeholder="Input username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                id="password"
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

            {/* Submit Button */}
            <div className="flex flex-col items-center gap-2 mb-4">
              <Button
                type="submit"
                className="w-full sm:w-[368px] bg-blue-600 text-white"
              >
                Login
              </Button>
            </div>
          </form>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
