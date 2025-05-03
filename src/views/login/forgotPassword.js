import React, { useEffect, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { TbBrandThreads } from "react-icons/tb";
import { FiFacebook } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../api/api";
import { RotatingLines } from "react-loader-spinner";
import "react-phone-input-2/lib/bootstrap.css";
import "./login.css";
import axios from "axios";
import ConfirmModal from "../../components/modals/confirmModal";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [successModal, setSuccessModal] = useState(false);

  // New password fields (for reset with token)
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [tokenFromURL, setTokenFromURL] = useState("");
  const [validToken, setValidToken] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("tokens...", token);
    if (token) {
      setTokenFromURL(token);
      const storedToken = localStorage.getItem("rt");
      if (storedToken && storedToken === token) {
        setValidToken(true);
      } else {
        setError("Invalid or expired token.");
      }
    }
  }, []);

  // Forgot Password - Email Submit
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        `${BASE_URL}/api/users/forgot-password/`,
        {
          email: email,
        }
      );

      if (response?.status === 200) {
        const resetToken = response.data?.reset_token;
        if (resetToken) {
          localStorage.setItem("rt", resetToken);
        }
        setMessage("Password reset link sent successfully!");
      }
    } catch (err) {
      console.error("Reset error:", err);
      setError(
        err?.response?.data?.error || "Something went wrong. Try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // New Password Submit
  const handleNewPasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/users/reset-password/`,
        {
          token: tokenFromURL,
          new_password: newPassword,
        }
      );

      if (response?.status === 200) {
        setSuccessModal(true);
        setMessage(
          "Password has been reset successfully.Redirecting to login..."
        );
        localStorage.removeItem("rt");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      console.error("Reset error:", err);
      setError(
        err?.response?.data?.error || "Something went wrong. Try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center sm:justify-between font-poppins sm:h-screen min-h-screen w-screen sm:p-10 bg-cover bg-center bg-no-repeat text-white bg-black background-imag">
      <div className="flex flex-col md:flex-row h-full">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-8 md:p-16 max-sm:pt-20">
          <div className="text-2xl sm:text-4xl md:text-5xl">
            {validToken ? "Set New Password" : "Forgot your password?"}
            <br />
            <span className="text-[#8601FF] font-semibold">
              {validToken
                ? "Enter your new password"
                : "Let’s get you a new one"}
            </span>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center items-center p-4 sm:p-6 md:p-0">
          <div className="p-3 sm:p-8 md:p-10 rounded-3xl shadow-lg border w-[30rem]">
            <h1 className="text-2xl md:text-3xl font-semibold text-center">
              {validToken ? "New Password 🔐" : "Reset Password 🔒"}
            </h1>
            <p className="text-gray-400 mb-8 text-center">
              {validToken
                ? "Enter and confirm your new password"
                : "Enter your registered email"}
            </p>

            <form
              className="space-y-4"
              onSubmit={
                validToken ? handleNewPasswordSubmit : handleResetSubmit
              }
            >
              {!validToken ? (
                <div>
                  <label className="block mb-1 text-sm" htmlFor="email">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 rounded-xl border bg-transparent border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#8601FF]"
                    placeholder="Enter your email"
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label className="block mb-1 text-sm">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full p-3 rounded-xl border bg-transparent border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#8601FF]"
                      placeholder="New password"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full p-3 rounded-xl border bg-transparent border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#8601FF]"
                      placeholder="Confirm new password"
                    />
                  </div>
                </>
              )}

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              {message && (
                <p className="text-[#8601FF] text-sm text-center">{message}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#8601FF] text-white rounded-xl hover:bg-green-600 transition-all duration-200"
              >
                {isLoading ? (
                  <div className="flex justify-center">
                    <RotatingLines
                      strokeColor="white"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="24"
                      visible={true}
                    />
                  </div>
                ) : validToken ? (
                  "Reset Password"
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>

            {!validToken && (
              <p className="text-sm text-center mt-6 text-gray-400">
                Remembered your password?{" "}
                <Link to="/login" className="text-green-400 underline">
                  Go back to login
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>

      <img
        alt="logo"
        src="/logo.png"
        className="absolute top-5 sm:top-10 left-5 sm:left-10 w-14 sm:w-20 cursor-pointer"
        onClick={() => navigate("/")}
      />

      <div className="flex flex-col sm:flex-row items-center gap-3 justify-between p-3 sm:px-32 sm:gap-[20rem]">
        <div className="text-[12px] max-sm:order-last sm:text-[16px]">
          © 2025 purpledrops All Rights Reserved.
        </div>
        <div className="flex gap-4 text-black">
          <button className="bg-white rounded-full p-2">
            <FaInstagram />
          </button>
          <button className="bg-white rounded-full p-2">
            <FaXTwitter />
          </button>
          <button className="bg-white rounded-full p-2">
            <FiFacebook />
          </button>
          <button className="bg-white rounded-full p-2">
            <TbBrandThreads />
          </button>
        </div>
      </div>
      {successModal && (
        <ConfirmModal
          title="Password reset successful"
        //   message1="Password has been reset successfully."
          message1="Redirecting to login..."
          onClose={() => setSuccessModal(false)}
        />
      )}
    </div>
  );
}
