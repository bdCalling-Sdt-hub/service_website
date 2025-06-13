"use client"
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ForgostPasswordPage = () => {
  return (
    <>
     <div className="min-h-screen flex flex-col justify-center md:justify-start md:flex-row bg-gray-50">
      {/* Left Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 p-3 sm:p-10">
        <div className="w-full max-w-md bg-white py-6 px-4 md:px-6 shadow-md rounded-md">
        <div className="flex items-center mb-3">
            <Link
              href="/login"
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to login
            </Link>
          </div>
          <h2 className="text-3xl font-bold mb-2 text-title">Forgot Password?</h2>
          <p className="text-gray-600 text-sm sm:text-md mb-6">Enter your email address and we will send you a
          verification code</p>

          {/* Login Form */}
          <ForgotPasswordForm/>

        </div>
      </div>

      {/* Right Side */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-blue-50 p-10">
        <div className="text-center">
          <Image src="/images/auth/forgot.png" alt="Login Illustration" width={600} height={600} />
        </div>
      </div>
    </div>
    </>
  )
}

export default ForgostPasswordPage;