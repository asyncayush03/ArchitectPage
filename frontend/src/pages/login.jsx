import React, { useState } from "react";
import { Lock, User } from "lucide-react";
import image from "../assets/modern.jpg";  

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white via-gray-50 to-white flex items-center justify-center relative overflow-hidden">

     
      <img
        src={image}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />

     
      <div className="absolute inset-0 bg-black/40"></div>

      
      <div className="relative z-10 w-full max-w-md bg-white/70 backdrop-blur-2xl shadow-2xl rounded-2xl border border-white/60 p-10 animate-fade-in">

       
        <div className="mb-4 flex justify-center">
          <span className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider bg-gradient-to-r from-red-500 to-amber-400 text-white rounded-full shadow-md">
            Admin Login
          </span>
        </div>

        <h2 className="text-center text-3xl font-semibold text-gray-900 tracking-wide mb-3">
          Welcome Back
        </h2>

        <p className="text-center text-sm text-gray-700 mb-8">
          Sign in to access your admin dashboard
        </p>

        <form className="space-y-6">

         
          <div>
            <label className="text-gray-700 text-sm mb-2 block">Email</label>
            <div className="relative">
              <User className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500 w-5 h-5" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/90 text-gray-700
                placeholder-gray-400 border border-gray-300 focus:outline-none
                focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-700 text-sm mb-2 block">Password</label>
            <div className="relative">
              <Lock className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500 w-5 h-5" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full pl-10 pr-12 py-3 rounded-lg bg-white/90 text-gray-700
                placeholder-gray-400 border border-gray-300 focus:outline-none
                focus:ring-2 focus:ring-amber-400"
              />

              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 text-xs cursor-pointer hover:text-gray-800"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>

         
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-red-500
            text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-2xl
            transition-all hover:scale-[1.02]"
          >
            Login
          </button>
        </form>

       

            

        <p className="text-[11px] text-center text-red-600 font-medium mt-4">
          ⚠ Authorized personnel only
        </p>
      </div>

      
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
